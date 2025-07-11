
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ShieldCheck, Camera, Hand, Fingerprint, RefreshCcw, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { verifyUserProfile, setUserVerified } from '@/app/actions';
import type { VerifyUserInput } from '@/ai/flows/verify-user-flow';
import { useRouter } from 'next/navigation';

const gestures = [
  { name: 'Peace Sign', emoji: '✌️', instruction: 'Hold up two fingers.' },
  { name: 'Thumbs Up', emoji: '👍', instruction: 'Give a thumbs up.' },
  { name: 'Okay Sign', emoji: '👌', instruction: 'Make an okay sign.' },
  { name: 'Fist', emoji: '✊', instruction: 'Make a fist.'},
  { name: 'Point Up', emoji: '☝️', instruction: 'Point one finger up.'},
];

type VerificationStep = 'start' | 'camera' | 'verifying' | 'success' | 'failure';

// Helper to convert a blob to a data URI
const blobToDataUrl = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export function VerificationDialog({ children }: { children: React.ReactNode }) {
  const { userProfile, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<VerificationStep>('start');
  const [currentGesture, setCurrentGesture] = useState(gestures[0]);
  const [failureReason, setFailureReason] = useState("");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  const pickNewGesture = useCallback(() => {
    setCurrentGesture(gestures[Math.floor(Math.random() * gestures.length)]);
  }, []);

  useEffect(() => {
    if (isOpen) {
      pickNewGesture();
      setCurrentStep('start');
    } else {
      // Cleanup camera stream when dialog closes
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  }, [isOpen, pickNewGesture]);

  const handleStartVerification = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
        setCurrentStep('camera');
      } else {
        throw new Error('getUserMedia not supported');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      toast({
        variant: 'destructive',
        title: 'Camera Access Denied',
        description: 'Please enable camera permissions in your browser settings.',
      });
      setCurrentStep('start');
    }
  };
  
  const handleCaptureAndVerify = async () => {
    if (!videoRef.current || !userProfile || !streamRef.current) return;
    
    setCurrentStep('verifying');
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);

    // Get live selfie as data URI
    const liveSelfieDataUri = canvas.toDataURL('image/jpeg');

    // Convert profile picture URL to data URI (if not already one)
    let profileImageDataUri = userProfile.images[0];
    // Check if the profile image is from an external URL that needs fetching
    if (profileImageDataUri && !profileImageDataUri.startsWith('data:')) {
        try {
            const response = await fetch(profileImageDataUri);
            const blob = await response.blob();
            profileImageDataUri = await blobToDataUrl(blob);
        } catch (error) {
            console.error("Error fetching profile image:", error);
            toast({
                title: "Verification Error",
                description: "Could not load your profile picture for comparison. Please try again.",
                variant: "destructive"
            });
            setCurrentStep('camera');
            return;
        }
    }

    const input: VerifyUserInput = {
      profileImageDataUri,
      liveSelfieDataUri,
      gestureToPerform: currentGesture.name,
    };
    
    const result = await verifyUserProfile(input);

    if (result.isVerified) {
      await setUserVerified(userProfile.id);
      setCurrentStep('success');
      toast({ title: 'Verification Complete!', description: 'Your profile is now verified.' });
      router.refresh();
    } else {
      setFailureReason(result.reasoning || "Verification failed. Please try again.");
      setCurrentStep('failure');
    }
  };
  
  const resetAndTryAgain = () => {
    pickNewGesture();
    setCurrentStep('start');
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'start':
        return (
          <>
            <DialogHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-primary/20 rounded-full">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
              </div>
              <DialogTitle className="text-center text-2xl">Profile Verification</DialogTitle>
              <DialogDescription className="text-center">
                Verify you're a real person by taking a quick, live selfie.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg text-center space-y-2">
                <p className="text-sm text-muted-foreground">Your challenge is to:</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl">{currentGesture.emoji}</span>
                  <div>
                    <p className="text-lg font-bold text-foreground">{currentGesture.name}</p>
                    <p className="text-sm text-muted-foreground">{currentGesture.instruction}</p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex-col gap-2">
              <Button onClick={handleStartVerification} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Camera className="mr-2 h-4 w-4" /> I'm Ready
              </Button>
            </DialogFooter>
          </>
        );

      case 'camera':
        return (
            <>
              <DialogHeader>
                  <DialogTitle className="text-center text-2xl">Take Your Selfie</DialogTitle>
                  <DialogDescription className="text-center">
                    Perform the gesture: <span className="font-bold text-primary">{currentGesture.name} ({currentGesture.emoji})</span>
                  </DialogDescription>
              </DialogHeader>
              <div className="aspect-video w-full bg-black rounded-md flex items-center justify-center text-muted-foreground overflow-hidden">
                <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted playsInline />
              </div>
              <DialogFooter>
                  <Button onClick={handleCaptureAndVerify} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Fingerprint className="mr-2 h-4 w-4" /> Verify Me
                  </Button>
              </DialogFooter>
            </>
        );
      
      case 'verifying':
        return (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-lg font-semibold text-foreground">Verifying...</p>
                <p className="text-sm text-muted-foreground">The AI is analyzing your photo.</p>
            </div>
        );

      case 'success':
        return (
            <div className="text-center py-8 space-y-4">
                <ShieldCheck className="w-16 h-16 text-green-500 mx-auto" />
                <h3 className="text-2xl font-bold text-foreground">Verification Successful!</h3>
                <p className="text-muted-foreground">Your profile now has a verified badge. You can close this window.</p>
                <Button onClick={() => setIsOpen(false)} className="w-full">Done</Button>
            </div>
        );

      case 'failure':
         return (
            <div className="text-center py-8 space-y-4">
                <AlertTriangle className="w-16 h-16 text-destructive mx-auto" />
                <h3 className="text-2xl font-bold text-foreground">Verification Failed</h3>
                <p className="text-muted-foreground">Reason: <span className="font-medium text-foreground/90">{failureReason}</span></p>
                <Button onClick={resetAndTryAgain} className="w-full">
                    <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
                </Button>
            </div>
         );

      default: return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
