
'use client';

import { useState, useRef, useEffect } from 'react';
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
import { ShieldCheck, Camera, Hand, Fingerprint } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// To be expanded with real gestures and AI flow
const gestures = [
  { name: 'Peace Sign', emoji: '✌️', instruction: 'Hold up two fingers.' },
  { name: 'Thumbs Up', emoji: '👍', instruction: 'Give a thumbs up.' },
  { name: 'Okay Sign', emoji: '👌', instruction: 'Make an okay sign with your hand.' },
];

export function VerificationDialog({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentGesture, setCurrentGesture] = useState(gestures[0]);

  // For future implementation
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // When the dialog opens, pick a new random gesture
    if (isOpen) {
      setCurrentGesture(gestures[Math.floor(Math.random() * gestures.length)]);
    } else {
      setHasCameraPermission(null);
    }
  }, [isOpen]);

  const handleStartVerification = async () => {
    // This is where we will request camera permissions and start the video feed
    // For now, this is a placeholder.
    toast({
      title: 'Camera Access (Coming Soon)',
      description: 'The app would now request camera permissions.',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card">
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

            <div className="aspect-video w-full bg-black rounded-md flex items-center justify-center text-muted-foreground">
                <Camera className="w-10 h-10" />
                <p className="ml-2">Camera feed will appear here</p>
            </div>
             
             {hasCameraPermission === false && (
                <Alert variant="destructive">
                    <AlertTitle>Camera Access Denied</AlertTitle>
                    <AlertDescription>
                       Please enable camera permissions in your browser settings to continue.
                    </AlertDescription>
                </Alert>
             )}
        </div>

        <DialogFooter className="flex-col gap-2">
          <Button onClick={handleStartVerification} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Camera className="mr-2 h-4 w-4" /> I'm Ready
          </Button>
           <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
            <Fingerprint className="w-3 h-3"/> Your photo is used only for verification and is not saved on your profile.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
