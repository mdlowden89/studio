
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mbtiQuizQuestions, mbtiTypeDescriptions } from '@/lib/mbti-quiz-data';
import { useAuth } from '@/hooks/use-auth';
import { updateUserMbtiType } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, BrainCircuit, Save, Send, ArrowLeft, RotateCw } from 'lucide-react';
import Link from 'next/link';

export default function MbtiQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const totalQuestions = mbtiQuizQuestions.length;
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  const handleAnswerSelect = (answerValue: string) => {
    const newAnswers = { ...answers, [currentQuestionIndex]: answerValue };
    setAnswers(newAnswers);

    // Automatically move to the next question
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, string>) => {
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
  }

  const handleSaveResult = async () => {
    if (!result || !user) return;
    setIsSaving(true);
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
  
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
  }

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
                  {result ? "Here's what we found. Save it to your profile!" : "Answer these questions to find your MBTI personality type."}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          {result ? (
            <>
              <CardContent className="text-center py-10">
                 <p className="text-6xl font-bold text-primary">{mbtiTypeDescriptions[result].emoji}</p>
                 <h2 className="text-5xl font-bold text-foreground mt-2">{result}</h2>
                 <p className="text-xl text-muted-foreground mt-1">{mbtiTypeDescriptions[result].title}</p>
                 <p className="text-sm text-foreground/80 mt-4 max-w-md mx-auto">
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
    </AppLayout>
  );
}
