
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Trash2, UploadCloud, Replace, Info, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { storage } from "@/lib/firebase";
import { ref, uploadString, getDownloadURL, deleteObject } from "firebase/storage";
import { updateUserProfileAction } from "@/app/actions";

interface ImageGalleryProps {
  initialImages: string[];
  userId: string;
}

export function ImageGallery({ initialImages, userId }: ImageGalleryProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});
  const { toast } = useToast();

  const handleImageUpload = async (file: File, index?: number) => {
    const isReplacing = typeof index === 'number';
    const loadingIndex = isReplacing ? index : images.length;

    setLoadingStates(prev => ({ ...prev, [loadingIndex]: true }));

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const dataUrl = reader.result as string;

        // Create a reference to the file in Firebase Storage
        const filePath = `users/${userId}/images/${Date.now()}-${file.name}`;
        const storageRef = ref(storage, filePath);

        // Upload the file
        const snapshot = await uploadString(storageRef, dataUrl, 'data_url');
        const downloadURL = await getDownloadURL(snapshot.ref);

        let oldImageURL: string | null = null;
        let newImagesArray: string[];

        if (isReplacing) {
          oldImageURL = images[index];
          newImagesArray = [...images];
          newImagesArray[index] = downloadURL;
        } else {
          newImagesArray = [...images, downloadURL];
        }

        // Update Firestore
        await updateUserProfileAction(userId, { images: newImagesArray });
        
        // If replacing and the old image was a real storage image, delete it
        if (isReplacing && oldImageURL && oldImageURL.includes('firebasestorage')) {
          try {
            const oldImageRef = ref(storage, oldImageURL);
            await deleteObject(oldImageRef);
          } catch (deleteError) {
            console.warn("Could not delete old image, it might not exist:", deleteError);
          }
        }

        setImages(newImagesArray);
        toast({
          title: "Image Saved!",
          description: `Your photo has been successfully ${isReplacing ? 'replaced' : 'added'}.`,
        });
      };

      reader.onerror = () => {
        throw new Error("Could not read file.");
      }

    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload Failed",
        description: "There was a problem uploading your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, [loadingIndex]: false }));
    }
  };

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleImageUpload(event.target.files[0]);
    }
    if (event.target) event.target.value = "";
  };

  const handleReplaceImage = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleImageUpload(event.target.files[0], index);
    }
    if (event.target) event.target.value = "";
  };

  const handleRemoveImage = async (index: number) => {
    if (images.length <= 1) {
      toast({ title: "Cannot Remove", description: "You must have at least one profile image.", variant: "destructive" });
      return;
    }

    setLoadingStates(prev => ({ ...prev, [index]: true }));
    
    const imageUrlToDelete = images[index];
    const newImagesArray = images.filter((_, i) => i !== index);

    try {
      // First, update Firestore
      await updateUserProfileAction(userId, { images: newImagesArray });

      // Then, delete from Storage if it's a firebase URL
      if (imageUrlToDelete.includes('firebasestorage')) {
        const imageRef = ref(storage, imageUrlToDelete);
        await deleteObject(imageRef);
      }

      setImages(newImagesArray);
      toast({ title: "Image Removed", description: `Your photo has been removed.` });

    } catch (error) {
      console.error("Error removing image:", error);
      toast({
        title: "Removal Failed",
        description: "There was a problem removing your image. Please try again.",
        variant: "destructive",
      });
    } finally {
        setLoadingStates(prev => ({ ...prev, [index]: false }));
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
              unoptimized={src.startsWith('data:') || src.includes('placehold.co')}
            />
            {loadingStates[index] && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 gap-2 z-20">
              <Button
                variant="outline"
                size="sm"
                className="bg-background/80 hover:bg-background text-foreground border-foreground/50"
                onClick={() => document.getElementById(`replace-input-${index}`)?.click()}
                disabled={loadingStates[index]}
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
                disabled={loadingStates[index]}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Remove
              </Button>
            </div>
          </Card>
        ))}
        {images.length < 6 && (
          <Card
            className="aspect-[3/4] border-2 border-dashed border-muted-foreground hover:border-primary transition-colors duration-300 flex items-center justify-center cursor-pointer bg-muted/30"
            onClick={() => {
                if (!loadingStates[images.length]) {
                    document.getElementById('add-image-input')?.click();
                }
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') document.getElementById('add-image-input')?.click(); }}
          >
            {loadingStates[images.length] ? (
                 <div className="text-center text-muted-foreground">
                    <Loader2 className="h-12 w-12 mx-auto mb-2 animate-spin" />
                    <p className="text-sm font-medium">Uploading...</p>
                </div>
            ) : (
                <div className="text-center text-muted-foreground">
                <UploadCloud className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm font-medium">Add Photo</p>
                <p className="text-xs">(Max {6 - images.length} remaining)</p>
                </div>
            )}
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
       <Alert variant="default" className="mt-6 border-primary/30">
        <Info className="h-4 w-4 text-primary" />
        <AlertTitle className="text-primary">Live Data Notice</AlertTitle>
        <AlertDescription className="text-xs text-muted-foreground">
          Image changes are now saved directly to Firebase Storage and your Firestore profile.
        </AlertDescription>
      </Alert>
    </div>
  );
}
