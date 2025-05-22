
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { X as XIcon, PlusCircle, Edit3, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PromptEditorProps {
  userPrompts: ProfilePromptAnswer[];
  availablePrompts: ProfilePrompt[];
}

export function PromptEditor({ userPrompts, availablePrompts }: PromptEditorProps) {
  const [prompts, setPrompts] = useState<ProfilePromptAnswer[]>(userPrompts);
  const [editingPromptIndex, setEditingPromptIndex] = useState<number | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [selectedPromptId, setSelectedPromptId] = useState<string>("");
  const { toast } = useToast();

  const startEditing = (index: number) => {
    setEditingPromptIndex(index);
    setSelectedPromptId(prompts[index].promptId);
    setCurrentAnswer(prompts[index].answer);
  };

  const startAddingNew = () => {
    if (prompts.length >= 3) { // Max 3 prompts for example
        toast({ title: "Limit Reached", description: "You can add a maximum of 3 prompts.", variant: "destructive"});
        return;
    }
    setEditingPromptIndex(prompts.length); // Indicates adding a new prompt
    setSelectedPromptId("");
    setCurrentAnswer("");
  };

  const handleSavePrompt = () => {
    if (editingPromptIndex === null || !selectedPromptId || currentAnswer.trim() === "") {
      toast({ title: "Error", description: "Please select a prompt and provide an answer.", variant: "destructive"});
      return;
    }

    const newPromptAnswer: ProfilePromptAnswer = { promptId: selectedPromptId, answer: currentAnswer };
    let updatedPrompts;
    if (editingPromptIndex < prompts.length) { // Editing existing
      updatedPrompts = prompts.map((p, i) => i === editingPromptIndex ? newPromptAnswer : p);
    } else { // Adding new
      updatedPrompts = [...prompts, newPromptAnswer];
    }
    setPrompts(updatedPrompts);
    setEditingPromptIndex(null);
    setSelectedPromptId("");
    setCurrentAnswer("");
    toast({ title: "Prompt Saved!", description: "Your prompt and answer have been updated."});
  };

  const handleRemovePrompt = (index: number) => {
    setPrompts(prompts.filter((_, i) => i !== index));
    if (editingPromptIndex === index) { // If removing the prompt being edited
        setEditingPromptIndex(null);
        setSelectedPromptId("");
        setCurrentAnswer("");
    }
    toast({ title: "Prompt Removed", description: "The prompt has been removed from your profile."});
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
                <Select value={selectedPromptId} onValueChange={setSelectedPromptId}>
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
                />
                <div className="flex gap-2">
                  <Button onClick={handleSavePrompt} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground"><Save className="mr-2 h-4 w-4"/>Save</Button>
                  <Button onClick={() => setEditingPromptIndex(null)} variant="outline" size="sm">Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="group">
                <p className="text-foreground whitespace-pre-line">{prompt.answer}</p>
                <div className="mt-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button onClick={() => startEditing(index)} variant="ghost" size="sm" className="text-primary hover:text-primary/80"><Edit3 className="mr-2 h-4 w-4"/>Edit</Button>
                  <Button onClick={() => handleRemovePrompt(index)} variant="ghost" size="sm" className="text-destructive hover:text-destructive/80"><XIcon className="mr-2 h-4 w-4"/>Remove</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {prompts.length < 3 && editingPromptIndex === null && (
        <Button onClick={startAddingNew} variant="outline" className="w-full border-dashed border-primary text-primary hover:bg-primary/10">
          <PlusCircle className="mr-2 h-5 w-5" /> Add a Prompt ({3-prompts.length} remaining)
        </Button>
      )}

      {editingPromptIndex === prompts.length && ( // Form for adding new prompt
         <Card className="bg-muted/30 border-primary border-2">
          <CardHeader><CardTitle className="text-lg">Add New Prompt</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Select value={selectedPromptId} onValueChange={setSelectedPromptId}>
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
            />
            <div className="flex gap-2">
              <Button onClick={handleSavePrompt} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground"><Save className="mr-2 h-4 w-4"/>Save Prompt</Button>
              <Button onClick={() => setEditingPromptIndex(null)} variant="outline" size="sm">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
