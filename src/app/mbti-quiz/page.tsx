
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mbtiQuizQuestions, mbtiTypeDescriptions, mbtiTypeDetails } from '@/lib/mbti-quiz-data';
import { useAuth } from '@/hooks/use-auth';
import { updateUserMbtiType, saveMbtiQuizProgress } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, BrainCircuit, Save, Send, ArrowLeft, RotateCw, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { CrossdPlusUpsellDialog } from '@/components/pricing/crossd-plus-upsell-dialog';

export default function MbtiQuizPage() {
  const { user, userProfile, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showUpsellDialog, setShowUpsellDialog] = useState(false);

  const totalQuestions = mbtiQuizQuestions.length;
  const isPremium = userProfile?.subscription?.status === 'active' || userProfile?.email === 'mlowdencrossd@gmail.com';

  // Load progress when the component mounts or userProfile changes
  useEffect(() => {
    if (userProfile) {
      const savedAnswers = userProfile.mbtiQuizProgress?.answers || {};
      const savedAnswersCount = Object.keys(savedAnswers).length;

      setAnswers(savedAnswers);

      if (savedAnswersCount > 0 && savedAnswersCount < totalQuestions) {
        setCurrentQuestionIndex(savedAnswersCount);
      } else if (savedAnswersCount === totalQuestions) {
        calculateResult(savedAnswers);
      }
    }
  }, [userProfile]);


  const handleAnswerSelect = async (answerValue: string) => {
    const newAnswers = { ...answers, [currentQuestionIndex]: answerValue };
    setAnswers(newAnswers);

    if (user) {
      // Fire-and-forget save to backend
      saveMbtiQuizProgress(user.uid, newAnswers).catch(err => {
        console.warn("Failed to save quiz progress:", err);
        // Optionally show a subtle warning to the user
      });
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, string>) => {
    if (Object.keys(finalAnswers).length < totalQuestions) return;

    const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    Object.values(finalAnswers).forEach(answer => {
      counts[answer as keyof typeof counts]++;
    });

    const mbtiType = [
      counts.E >= counts.I ? 'E' : 'I',
      counts.S >= counts.N ? 'S' : 'N',
      counts.T >= counts.F ? 'T' : 'F',
      counts.J >= counts.P ? 'J' : 'P'
    ].join('');

    setResult(mbtiType);
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSaveResult = async () => {
    if (!result || !user) return;
    setIsSaving(true);
    // updateUserMbtiType now also clears the quiz progress from the DB
    const response = await updateUserMbtiType(user.uid, result);
    if (response.success) {
      toast({
        title: "Personality Type Saved!",
        description: `Your MBTI type has been set to ${result}.`,
      });
      router.push('/profile');
    } else {
      toast({
        title: "Error Saving",
        description: response.error || "Could not save your result. Please try again.",
        variant: "destructive",
      });
    }
    setIsSaving(false);
  };
  
  const handleRestartQuiz = async () => {
    if (user) {
      // Clear progress in the database
      await saveMbtiQuizProgress(user.uid, {});
    }
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
  };

  const handleResultClick = () => {
    if (isPremium) {
      setShowDetailsDialog(true);
    } else {
      setShowUpsellDialog(true);
    }
  };

  if (isAuthLoading) {
    return (
      <AppLayout>
        <div className="flex h-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }
  
  if (!user) {
    router.push('/login-form');
    return null;
  }
  
  const progress = (currentQuestionIndex / totalQuestions) * 100;
  const currentResultDetails = result ? mbtiTypeDetails[result] : null;

  return (
    <AppLayout>
      <div className="container mx-auto py-8 flex justify-center">
        <Card className="w-full max-w-2xl bg-card shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <BrainCircuit className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="text-3xl font-bold">
                  {result ? "Your Personality Result" : "Discover Your Type"}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {result ? "Here's what we found. Click your result for an in-depth analysis." : "Answer these questions to find your MBTI personality type."}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          {result ? (
            <>
              <CardContent className="py-10">
                <button 
                  onClick={handleResultClick}
                  className="w-full text-center p-6 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors cursor-pointer disabled:cursor-default"
                  disabled={!currentResultDetails}
                  aria-label={`View details for ${result}`}
                >
                  <p className="text-6xl font-bold text-primary">{mbtiTypeDescriptions[result].emoji}</p>
                  <h2 className="text-5xl font-bold text-foreground mt-2">{result}</h2>
                  <p className="text-xl text-muted-foreground mt-1">{mbtiTypeDescriptions[result].title}</p>
                  <div className="mt-4 inline-flex items-center text-sm text-primary">
                     <Sparkles className="w-4 h-4 mr-2" />
                     Click for In-Depth Analysis
                     {!isPremium && <Star className="w-4 h-4 ml-2 text-yellow-400 fill-yellow-500" />}
                  </div>
                </button>
                 <p className="text-xs text-center text-muted-foreground mt-4 max-w-md mx-auto">
                    This personality type will now be visible on your profile and help us find you more compatible matches.
                 </p>
              </CardContent>
              <CardFooter className="flex-col sm:flex-row justify-center gap-3 border-t pt-6">
                <Button onClick={handleRestartQuiz} variant="outline" disabled={isSaving}>
                    <RotateCw className="mr-2 h-4 w-4" /> Retake Quiz
                </Button>
                <Button onClick={handleSaveResult} disabled={isSaving} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  {isSaving ? 'Saving...' : 'Save to Profile'}
                </Button>
              </CardFooter>
            </>
          ) : (
            <>
              <CardContent className="space-y-6 pt-2">
                <div className="space-y-2">
                    <p className="text-sm text-center text-muted-foreground">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
                    <Progress value={progress} className="w-full h-2 [&>div]:bg-primary" />
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg min-h-[80px] flex items-center justify-center">
                    <p className="text-xl text-center font-semibold text-foreground">
                        {mbtiQuizQuestions[currentQuestionIndex].question}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto py-4 text-base text-left flex items-start gap-3 whitespace-normal justify-start hover:border-primary"
                    onClick={() => handleAnswerSelect(mbtiQuizQuestions[currentQuestionIndex].answers[0].value)}
                  >
                    <span className="font-bold text-primary">A.</span>
                    <span>{mbtiQuizQuestions[currentQuestionIndex].answers[0].text}</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 text-base text-left flex items-start gap-3 whitespace-normal justify-start hover:border-primary"
                    onClick={() => handleAnswerSelect(mbtiQuizQuestions[currentQuestionIndex].answers[1].value)}
                  >
                     <span className="font-bold text-primary">B.</span>
                    <span>{mbtiQuizQuestions[currentQuestionIndex].answers[1].text}</span>
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button onClick={handlePreviousQuestion} variant="ghost" disabled={currentQuestionIndex === 0}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Link href="/dashboard" passHref>
                    <Button variant="link">Save & Exit Later</Button>
                </Link>
              </CardFooter>
            </>
          )}

        </Card>
      </div>
      
      {currentResultDetails && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
            <DialogContent className="sm:max-w-xl bg-card">
              <DialogHeader className="text-center">
                 <DialogTitle className="text-3xl font-bold text-primary flex items-center justify-center gap-3">
                    <span className="text-4xl">{mbtiTypeDescriptions[result!].emoji}</span>
                    <span>{result} - {currentResultDetails.title}</span>
                 </DialogTitle>
                 <DialogDescription className="text-md text-muted-foreground">{currentResultDetails.categoryEmoji} {currentResultDetails.category}</DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="p-4 space-y-4">
                    <div>
                        <h4 className="font-semibold text-lg text-foreground mb-2">Key Traits</h4>
                        <div className="flex flex-wrap gap-2">
                            {currentResultDetails.keyTraits.map(trait => <Badge key={trait} variant="secondary">{trait}</Badge>)}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold text-lg text-foreground mb-2">Strengths</h4>
                        <div className="flex flex-wrap gap-2">
                            {currentResultDetails.strengths.map(strength => <Badge key={strength} variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">{strength}</Badge>)}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold text-lg text-foreground mb-2">Weaknesses</h4>
                        <div className="flex flex-wrap gap-2">
                            {currentResultDetails.weaknesses.map(weakness => <Badge key={weakness} variant="secondary" className="bg-red-500/10 text-red-400 border-red-500/20">{weakness}</Badge>)}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold text-lg text-foreground mb-2">Ideal Roles</h4>
                        <div className="flex flex-wrap gap-2">
                            {currentResultDetails.idealRoles.map(role => <Badge key={role} variant="secondary">{role}</Badge>)}
                        </div>
                    </div>
                </div>
              </ScrollArea>
            </DialogContent>
        </Dialog>
      )}

      <CrossdPlusUpsellDialog
        isOpen={showUpsellDialog}
        onOpenChange={setShowUpsellDialog}
      />

    </AppLayout>
  );
}
