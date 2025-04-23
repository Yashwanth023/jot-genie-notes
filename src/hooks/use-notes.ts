
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Note } from "@/types";
import { noteService } from "@/services/noteService";
import { useAuth } from "@/context/AuthContext";
import { aiService } from "@/services/aiService";

export function useNotes() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const notesQuery = useQuery({
    queryKey: ["notes"],
    queryFn: () => (user ? noteService.getNotes(user.id) : Promise.resolve([])),
    enabled: !!user,
  });

  const createNoteMutation = useMutation({
    mutationFn: (noteData: Omit<Note, "id" | "created_at" | "updated_at">) => {
      return noteService.createNote(noteData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast({
        title: "Note created",
        description: "Your note has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create note",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: (note: Note) => {
      return noteService.updateNote(note);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast({
        title: "Note updated",
        description: "Your note has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update note",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (noteId: string) => {
      return noteService.deleteNote(noteId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast({
        title: "Note deleted",
        description: "Your note has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete note",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    },
  });

  const summarizeNoteMutation = useMutation({
    mutationFn: async (note: Note) => {
      const summary = await aiService.summarizeText(note.content);
      return noteService.updateNote({
        ...note,
        summary,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast({
        title: "Note summarized",
        description: "Your note has been summarized successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to summarize note",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    },
  });

  return {
    notes: notesQuery.data || [],
    isLoading: notesQuery.isLoading,
    isError: notesQuery.isError,
    createNote: createNoteMutation.mutate,
    updateNote: updateNoteMutation.mutate,
    deleteNote: deleteNoteMutation.mutate,
    summarizeNote: summarizeNoteMutation.mutate,
    isCreating: createNoteMutation.isPending,
    isUpdating: updateNoteMutation.isPending,
    isDeleting: deleteNoteMutation.isPending,
    isSummarizing: summarizeNoteMutation.isPending,
  };
}
