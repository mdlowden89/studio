
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Trash2, UploadCloud, Replace } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageGalleryProps {
  initialImages: string[];
}

export function ImageGallery({ initialImages }: ImageGalleryProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const { toast } = useToast();

  const handleFileSelection = (file: File, index?: number) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      if (typeof index === 'number') { // Replacing an existing image
        const newImagesArray = [...images];
        newImagesArray[index] = dataUrl;
        setImages(newImagesArray);
        toast({
          title: "Image Preview Updated",
          description: `Image ${index + 1} has been updated. Save your profile to make it permanent.`,
        });
      } else { // Adding a new image
        if (images.length < 6) {
          setImages([...images, dataUrl]);
          toast({
            title: "Image Preview Added",
            description: "Your new image has been added. Save your profile to make it permanent.",
          });
        } else {
          toast({
            title: "Image Limit Reached",
            description: "You can have a maximum of 6 images.",
            variant: "destructive",
          });
        }
      }
    };
    reader.onerror = () => {
      toast({
        title: "Error Reading File",
        description: "Could not read the selected image file.",
        variant: "destructive",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      handleFileSelection(file);
    }
    if (event.target) {
      event.target.value = "";
    }
  };

  const handleReplaceImage = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      handleFileSelection(file, index);
    }
    if (event.target) {
      event.target.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    if (images.length > 1) {
      setImages(images.filter((_, i) => i !== index));
      toast({ title: "Image Removed", description: `Image ${index + 1} has been removed. Save profile to confirm.` });
    } else {
      toast({ title: "Cannot Remove", description: "You must have at least one profile image.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((src, index) => (
          <Card key={`${src.substring(0, 30)}-${index}`} className="group relative aspect-[3/4] overflow-hidden bg-muted">
            <Image
              src={src}
              alt={`Profile image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
              data-ai-hint="profile lifestyle"
              unoptimized={src.startsWith('data:') || src.startsWith('https://placehold.co')}
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-background/80 hover:bg-background text-foreground border-foreground/50"
                onClick={() => document.getElementById(`replace-input-${index}`)?.click()}
              >
                <Replace className="h-4 w-4 mr-2" /> Replace
              </Button>
              <Input
                type="file"
                id={`replace-input-${index}`}
                className="hidden"
                onChange={(e) => handleReplaceImage(index, e)}
                accept="image/*"
              />
              <Button
                variant="destructive"
                size="sm"
                className="bg-destructive/80 hover:bg-destructive text-destructive-foreground"
                onClick={() => handleRemoveImage(index)}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Remove
              </Button>
            </div>
          </Card>
        ))}
        {images.length < 6 && (
          <Card
            className="aspect-[3/4] border-2 border-dashed border-muted-foreground hover:border-primary transition-colors duration-300 flex items-center justify-center cursor-pointer bg-muted/30"
            onClick={() => document.getElementById('add-image-input')?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') document.getElementById('add-image-input')?.click(); }}
          >
            <div className="text-center text-muted-foreground">
              <UploadCloud className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm font-medium">Add Photo</p>
              <p className="text-xs">(Max {6 - images.length} remaining)</p>
            </div>
            <Input
              type="file"
              id="add-image-input"
              className="hidden"
              onChange={handleAddImage}
              accept="image/*"
            />
          </Card>
        )}
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Click on an image to replace or remove it. New image uploads are client-side previews.
        <br />
        In a real app, you would hit "Save Profile" to make these changes permanent.
      </p>
    </div>
  );
}
