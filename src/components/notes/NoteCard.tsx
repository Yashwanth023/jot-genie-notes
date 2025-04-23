
import { useState } from "react";
import { Note } from "@/types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Trash, Plus } from "lucide-react";
import NoteEditor from "./NoteEditor";

interface NoteCardProps {
  note?: Note;
  onEdit?: (note: Note) => void;
  onDelete?: (noteId: string) => void;
  onCreate?: (title: string, content: string, color: string) => void;
  onSummarize?: (note: Note) => void;
  className?: string;
  isLoading?: boolean;
}

export default function NoteCard({
  note,
  onEdit,
  onDelete,
  onCreate,
  onSummarize,
  className,
  isLoading = false,
}: NoteCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isCreateCard = !note;

  const noteColors = {
    yellow: "bg-note-yellow",
    blue: "bg-note-blue",
    green: "bg-note-green",
    pink: "bg-note-pink",
    purple: "bg-note-purple",
    peach: "bg-note-peach",
  };

  const getColorClass = () => {
    if (isCreateCard) return "bg-secondary";
    return note.color in noteColors 
      ? noteColors[note.color as keyof typeof noteColors] 
      : "bg-note-yellow";
  };

  const handleDelete = () => {
    if (onDelete && note) {
      onDelete(note.id);
    }
  };

  const handleSummarize = () => {
    if (onSummarize && note) {
      onSummarize(note);
    }
  };

  if (isCreateCard) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Card 
            className={`h-[260px] flex flex-col items-center justify-center cursor-pointer border-dashed hover:border-primary transition-colors ${className}`}
          >
            <div className="flex flex-col items-center gap-2">
              <Plus className="h-10 w-10 text-muted-foreground" />
              <p className="text-muted-foreground">Create new note</p>
            </div>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create a new note</DialogTitle>
          </DialogHeader>
          <NoteEditor
            onSave={(title, content, color) => {
              if (onCreate) {
                onCreate(title, content, color);
                setIsOpen(false);
              }
            }}
            colors={Object.keys(noteColors)}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Card className={`h-[260px] flex flex-col overflow-hidden ${getColorClass()} ${className}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg line-clamp-1">{note.title}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsOpen(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSummarize}>
                  Summarize with AI
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleDelete}
                  className="text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="pb-2 flex-grow overflow-hidden">
          {note.summary ? (
            <div className="flex flex-col h-full">
              <div className="text-sm mb-2 line-clamp-2">{note.content}</div>
              <div className="mt-auto">
                <p className="text-xs font-medium text-muted-foreground">AI Summary</p>
                <p className="text-sm font-medium line-clamp-3">{note.summary}</p>
              </div>
            </div>
          ) : (
            <div className="text-sm line-clamp-6">{note.content}</div>
          )}
        </CardContent>
        <CardFooter className="pt-2">
          <p className="text-xs text-muted-foreground">
            {new Date(note.updated_at).toLocaleDateString()}
          </p>
        </CardFooter>
      </Card>
      
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit note</DialogTitle>
        </DialogHeader>
        <NoteEditor
          note={note}
          onSave={(title, content, color) => {
            if (onEdit) {
              onEdit({ ...note, title, content, color });
              setIsOpen(false);
            }
          }}
          colors={Object.keys(noteColors)}
        />
      </DialogContent>
    </Dialog>
  );
}
