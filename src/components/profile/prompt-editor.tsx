
"use client";

import { useState } from "react";
import type { ProfilePrompt, ProfilePromptAnswer } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X as XIcon, PlusCircle, Edit3, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

interface PromptEditorProps {
  userPrompts: ProfilePromptAnswer[];
  availablePrompts: ProfilePrompt[];
  userId: string;
}

export function PromptEditor({ userPrompts, availablePrompts, userId }: PromptEditorProps) {
  const [prompts, setPrompts] = useState<ProfilePromptAnswer[]>(userPrompts);
  const [editingPromptIndex, setEditingPromptIndex] = useState<number | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [selectedPromptId, setSelectedPromptId] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const startEditing = (index: number) => {
    setEditingPromptIndex(index);
    setSelectedPromptId(prompts[index].promptId);
    setCurrentAnswer(prompts[index].answer);
  };

  const startAddingNew = () => {
    if (prompts.length >= 3) {
      toast({ title: "Limit Reached", description: "You can add a maximum of 3 prompts.", variant: "destructive" });
      return;
    }
    setEditingPromptIndex(prompts.length);
    setSelectedPromptId("");
    setCurrentAnswer("");
  };

  const handleSavePrompt = async () => {
    if (editingPromptIndex === null || !selectedPromptId || currentAnswer.trim() === "") {
      toast({ title: "Error", description: "Please select a prompt and provide an answer.", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    const newPromptAnswer: ProfilePromptAnswer = { promptId: selectedPromptId, answer: currentAnswer };
    let updatedPrompts;
    if (editingPromptIndex < prompts.length) {
      updatedPrompts = prompts.map((p, i) => i === editingPromptIndex ? newPromptAnswer : p);
    } else {
      updatedPrompts = [...prompts, newPromptAnswer];
    }

    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { prompts: updatedPrompts });
      setPrompts(updatedPrompts);
      setEditingPromptIndex(null);
      setSelectedPromptId("");
      setCurrentAnswer("");
      toast({ title: "Prompt Saved!", description: "Your prompt and answer have been updated." });
    } catch (error) {
      console.error("Error saving prompt:", error);
      toast({ title: "Save Failed", description: "Could not save prompt changes to the database.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemovePrompt = async (index: number) => {
    setIsSaving(true);
    const updatedPrompts = prompts.filter((_, i) => i !== index);

    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { prompts: updatedPrompts });
      setPrompts(updatedPrompts);
      if (editingPromptIndex === index) {
        setEditingPromptIndex(null);
        setSelectedPromptId("");
        setCurrentAnswer("");
      }
      toast({ title: "Prompt Removed", description: "The prompt has been removed from your profile." });
    } catch (error) {
      console.error("Error removing prompt:", error);
      toast({ title: "Removal Failed", description: "Could not remove the prompt from the database.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };


  const getPromptQuestion = (promptId: string) => {
    return availablePrompts.find(p => p.id === promptId)?.question || "Unknown Prompt";
  };

  const unselectedPrompts = availablePrompts.filter(ap => !prompts.some(up => up.promptId === ap.id && up.promptId !== selectedPromptId));

  return (
    <div className="space-y-6">
      {prompts.map((prompt, index) => (
        <Card key={index} className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-lg">{getPromptQuestion(prompt.promptId)}</CardTitle>
          </CardHeader>
          <CardContent>
            {editingPromptIndex === index ? (
              <div className="space-y-3">
                <Select value={selectedPromptId} onValueChange={setSelectedPromptId} disabled={isSaving}>
                  <SelectTrigger className="bg-input">
                    <SelectValue placeholder="Select a prompt" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value={prompt.promptId} key={prompt.promptId}>
                      {getPromptQuestion(prompt.promptId)}
                    </SelectItem>
                    {unselectedPrompts.map(ap => (
                      <SelectItem key={ap.id} value={ap.id}>{ap.question}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Your answer..."
                  rows={3}
                  className="bg-input"
                  disabled={isSaving}
                />
                <div className="flex gap-2">
                  <Button onClick={handleSavePrompt} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSaving}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                  <Button onClick={() => setEditingPromptIndex(null)} variant="outline" size="sm" disabled={isSaving}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="group">
                <p className="text-foreground whitespace-pre-line">{prompt.answer}</p>
                <div className="mt-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button onClick={() => startEditing(index)} variant="ghost" size="sm" className="text-primary hover:text-primary/80" disabled={isSaving}><Edit3 className="mr-2 h-4 w-4" />Edit</Button>
                  <Button onClick={() => handleRemovePrompt(index)} variant="ghost" size="sm" className="text-destructive hover:text-destructive/80" disabled={isSaving}><XIcon className="mr-2 h-4 w-4" />Remove</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {prompts.length < 3 && editingPromptIndex === null && (
        <Button onClick={startAddingNew} variant="outline" className="w-full border-dashed border-primary text-primary hover:bg-primary/10" disabled={isSaving}>
          <PlusCircle className="mr-2 h-5 w-5" /> Add a Prompt ({3 - prompts.length} remaining)
        </Button>
      )}

      {editingPromptIndex === prompts.length && (
        <Card className="bg-muted/30 border-primary border-2">
          <CardHeader><CardTitle className="text-lg">Add New Prompt</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Select value={selectedPromptId} onValueChange={setSelectedPromptId} disabled={isSaving}>
              <SelectTrigger className="bg-input">
                <SelectValue placeholder="Select a new prompt to answer" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {unselectedPrompts.map(ap => (
                  <SelectItem key={ap.id} value={ap.id}>{ap.question}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Your answer..."
              rows={3}
              className="bg-input"
              disabled={isSaving}
            />
            <div className="flex gap-2">
              <Button onClick={handleSavePrompt} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {isSaving ? 'Saving...' : 'Save Prompt'}
              </Button>
              <Button onClick={() => setEditingPromptIndex(null)} variant="outline" size="sm" disabled={isSaving}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
