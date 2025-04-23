
import { Note } from "@/types";
import NoteCard from "@/components/notes/NoteCard";
import { useNotes } from "@/hooks/use-notes";

export default function NoteGrid() {
  const { 
    notes, 
    isLoading, 
    createNote, 
    updateNote, 
    deleteNote, 
    summarizeNote, 
    isCreating, 
    isUpdating, 
    isDeleting,
    isSummarizing
  } = useNotes();

  const handleCreateNote = (title: string, content: string, color: string) => {
    if (!title.trim() || !content.trim()) return;
    
    createNote({
      title,
      content,
      color,
      user_id: "", // Will be set by the hook
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[260px] rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NoteCard 
        onCreate={handleCreateNote} 
        isLoading={isCreating}
      />
      
      {notes.length > 0 ? (
        notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={updateNote}
            onDelete={deleteNote}
            onSummarize={summarizeNote}
            isLoading={
              isUpdating || 
              isDeleting || 
              isSummarizing
            }
          />
        ))
      ) : (
        <div className="col-span-full text-center text-muted-foreground p-6">
          No notes yet. Create your first note to get started.
        </div>
      )}
    </div>
  );
}
