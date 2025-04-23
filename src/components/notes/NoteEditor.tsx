
import { useState } from "react";
import { Note } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface NoteEditorProps {
  note?: Note;
  onSave: (title: string, content: string, color: string) => void;
  colors: string[];
}

export default function NoteEditor({ note, onSave, colors }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [selectedColor, setSelectedColor] = useState(note?.color || colors[0]);

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave(title, content, selectedColor);
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[200px]"
        />
      </div>
      <div className="space-y-2">
        <Label>Color</Label>
        <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <RadioGroupItem value={color} id={`color-${color}`} className="sr-only" />
              <Label
                htmlFor={`color-${color}`}
                className={`w-8 h-8 rounded-full cursor-pointer ring-offset-background transition-all hover:scale-110 ${
                  selectedColor === color ? "ring-2 ring-primary ring-offset-2" : ""
                } bg-note-${color}`}
              />
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="flex justify-end pt-4">
        <Button onClick={handleSave}>Save Note</Button>
      </div>
    </div>
  );
}
