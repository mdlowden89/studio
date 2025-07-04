
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mbtiQuizQuestions, mbtiTypeDescriptions } from '@/lib/mbti-quiz-data';
import { mbtiTypeDetails } from '@/lib/mbti-results-data';
import { useAuth } from '@/hooks/use-auth';
import { updateUserMbtiType, saveMbtiQuizProgress } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, BrainCircuit, Save, Send, ArrowLeft, RotateCw, Sparkles, Star, Heart, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { CrossdPlusUpsellDialog } from '@/components/pricing/crossd-plus-upsell-dialog';
import { Separator } from '@/components/ui/separator';

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
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(true);

  const isInitialLoadDone = useRef(false);

  const totalQuestions = mbtiQuizQuestions.length;
  const isPremium = userProfile?.subscription?.status === 'active' || userProfile?.email === 'mlowdencrossd@gmail.com';

  const calculateResult = useCallback(async (finalAnswers: Record<number, string>) => {
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

    if (user) {
      const response = await updateUserMbtiType(user.uid, mbtiType);
      if (response.success) {
        toast({
          title: "Quiz Complete!",
          description: `Your personality type is ${mbtiType}. We've automatically saved it to your profile.`,
        });
      } else {
        toast({
          title: "Auto-save failed",
          description: "Could not automatically save your result. Please use the 'Save to Profile' button.",
          variant: "destructive",
        });
      }
    }
  }, [totalQuestions, user, toast]);

  useEffect(() => {
    if (isAuthLoading || !userProfile || isInitialLoadDone.current) {
        if (!isAuthLoading && !isInitialLoadDone.current) {
          setIsLoadingQuiz(false);
        }
        return;
    }

    const savedAnswers = userProfile.mbtiQuizProgress?.answers || {};
    const savedAnswersCount = Object.keys(savedAnswers).length;

    if (savedAnswersCount > 0) {
      setAnswers(savedAnswers);
      if (savedAnswersCount >= totalQuestions) {
        calculateResult(savedAnswers);
      } else {
        setCurrentQuestionIndex(savedAnswersCount);
      }
      toast({
        title: "Welcome Back!",
        description: `We've loaded your progress. You're on question ${savedAnswersCount + 1}.`,
      });
    }

    isInitialLoadDone.current = true;
    setIsLoadingQuiz(false);
  }, [userProfile, isAuthLoading, totalQuestions, toast, calculateResult]);


  const handleAnswerSelect = async (answerValue: string) => {
    const newAnswers = { ...answers, [currentQuestionIndex]: answerValue };
    setAnswers(newAnswers);

    if (user) {
      saveMbtiQuizProgress(user.uid, newAnswers).catch(err => {
        console.warn("Failed to save quiz progress in background:", err);
      });
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      await calculateResult(newAnswers);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSaveResult = async () => {
    if (!result || !user) return;
    setIsSaving(true);
    const response = await updateUserMbtiType(user.uid, result);
    if (response.success) {
      toast({
        title: "Personality Type Saved!",
        description: `Your MBTI type has been set to ${result} on your profile.`,
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

  if (isAuthLoading || isLoadingQuiz) {
    return (
      <AppLayout>
        <div className="flex h-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
           <p className="ml-3 text-muted-foreground">Loading Quiz...</p>
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
            <DialogContent className="sm:max-w-2xl bg-card p-0">
                <DialogHeader className="p-6 pb-4">
                    <DialogTitle className="text-3xl font-bold text-primary flex items-center gap-3">
                        <span className="text-4xl">{mbtiTypeDescriptions[result!].emoji}</span>
                        <span>{result} - {currentResultDetails.title}</span>
                    </DialogTitle>
                    <DialogDescription className="text-md text-muted-foreground pt-1">
                        {currentResultDetails.nicknames.join(' • ')}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-2">
                    <div className="px-6 pb-6 space-y-6">
                        <Separator />
                        <div className="space-y-1">
                            <h4 className="font-semibold text-lg text-foreground">Core Characteristics</h4>
                            <div className="space-y-2">
                                {currentResultDetails.coreCharacteristics.map((char, index) => (
                                    <div key={`char-${index}`} className="text-sm">
                                        <span className="font-semibold text-foreground/90">{char.trait}: </span>
                                        <span className="text-muted-foreground">{char.description}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator />
                        <div className="space-y-1">
                            <h4 className="font-semibold text-lg text-foreground">Cognitive Function Stack</h4>
                             <div className="space-y-2">
                                {currentResultDetails.cognitiveStack.map((stack, index) => (
                                    <div key={`stack-${index}`} className="text-sm">
                                        <span className="font-semibold text-foreground/90">{stack.functionName}: </span>
                                        <span className="text-muted-foreground">{stack.description}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                         <Separator />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div className="space-y-1">
                                <h4 className="font-semibold text-lg text-green-400">Strengths</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    {currentResultDetails.strengths.map((s, index) => <li key={`strength-${index}`}><span className="font-semibold text-foreground/90">{s.strength}:</span> {s.description}</li>)}
                                </ul>
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-semibold text-lg text-red-400">Weaknesses</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    {currentResultDetails.weaknesses.map((w, index) => <li key={`weakness-${index}`}><span className="font-semibold text-foreground/90">{w.weakness}:</span> {w.description}</li>)}
                                </ul>
                            </div>
                        </div>

                         <Separator />
                         <div className="space-y-1">
                            <h4 className="font-semibold text-lg text-foreground">Ideal Careers & Roles</h4>
                             <div className="flex flex-wrap gap-2 mt-2">
                                {currentResultDetails.idealCareers.map((career, index) => <Badge key={`career-${index}`} variant="secondary">{career.field}</Badge>)}
                            </div>
                        </div>

                        <Separator />
                        
                        {currentResultDetails.relationshipDeepDive ? (
                          <div className="space-y-4">
                              <h4 className="font-semibold text-lg text-foreground flex items-center gap-2"><Heart className="w-5 h-5 text-primary"/>Relationships & Communication</h4>
                              
                              <div className="p-3 bg-muted/30 rounded-md">
                                <h5 className="font-semibold text-foreground/90 mb-1">{currentResultDetails.relationshipDeepDive.friendship.title}</h5>
                                <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground/80">Core Needs:</span> {currentResultDetails.relationshipDeepDive.friendship.coreNeeds}</p>
                                <p className="text-xs text-muted-foreground mt-1"><span className="font-medium text-foreground/80">How They Show Up:</span> {currentResultDetails.relationshipDeepDive.friendship.howTheyShowUp}</p>
                              </div>

                              <div className="p-3 bg-muted/30 rounded-md">
                                <h5 className="font-semibold text-foreground/90 mb-1">{currentResultDetails.relationshipDeepDive.romance.title}</h5>
                                <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground/80">Core Needs:</span> {currentResultDetails.relationshipDeepDive.romance.coreNeeds}</p>
                                <p className="text-xs text-muted-foreground mt-1"><span className="font-medium text-foreground/80">How They Love:</span> {currentResultDetails.relationshipDeepDive.romance.howTheyLove}</p>
                                <p className="text-xs text-muted-foreground mt-1"><span className="font-medium text-foreground/80">Ideal Partner:</span> {currentResultDetails.relationshipDeepDive.romance.idealPartner}</p>
                              </div>

                              <div className="p-3 bg-muted/30 rounded-md">
                                <h5 className="font-semibold text-foreground/90 mb-1">{currentResultDetails.relationshipDeepDive.communication.title}</h5>
                                <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground/80">Primary Traits:</span> {currentResultDetails.relationshipDeepDive.communication.primaryTraits}</p>
                                <p className="text-xs text-muted-foreground mt-1"><span className="font-medium text-foreground/80">How to Communicate With Them:</span> {currentResultDetails.relationshipDeepDive.communication.howToCommunicate}</p>
                              </div>

                              <div className="p-3 bg-muted/30 rounded-md">
                                  <h5 className="font-semibold text-foreground/90 mb-1">{currentResultDetails.relationshipDeepDive.compatibility.title}</h5>
                                  <p className="text-xs text-muted-foreground italic mb-2">{currentResultDetails.relationshipDeepDive.compatibility.summary}</p>
                                  <div className="space-y-1">
                                    {currentResultDetails.relationshipDeepDive.compatibility.commonMatches.map((match, index) => (
                                      <p key={`match-${index}`} className="text-xs text-muted-foreground"><span className="font-medium text-green-400/80">{match.type}:</span> {match.reason}</p>
                                    ))}
                                  </div>
                              </div>

                               <div className="p-3 bg-primary/10 rounded-md border border-primary/20">
                                <h5 className="font-semibold text-primary/90 mb-1 flex items-center gap-1.5"><MessageSquare className="w-4 h-4"/>{currentResultDetails.relationshipDeepDive.summary.title}</h5>
                                <p className="text-sm text-foreground/90 italic">&quot;{currentResultDetails.relationshipDeepDive.summary.text}&quot;</p>
                              </div>

                          </div>
                        ) : (
                          <div className="space-y-1">
                              <h4 className="font-semibold text-lg text-foreground">Relationships & Communication</h4>
                              <div className="space-y-2">
                                  {currentResultDetails.relationships.map((rel, index) => (
                                      <div key={`rel-${index}`} className="text-sm">
                                          <span className="font-semibold text-foreground/90">{rel.area}: </span>
                                          <span className="text-muted-foreground">{rel.behavior}</span>
                                      </div>
                                  ))}
                              </div>
                          </div>
                        )}
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
