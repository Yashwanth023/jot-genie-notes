
import { Note } from "@/types";

// Mock API service for notes - in a real app, this would connect to Supabase
export const noteService = {
  getNotes: async (userId: string): Promise<Note[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    // Get notes from localStorage
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      const allNotes = JSON.parse(storedNotes) as Note[];
      return allNotes.filter(note => note.user_id === userId);
    }
    
    return [];
  },
  
  createNote: async (note: Omit<Note, "id" | "created_at" | "updated_at">): Promise<Note> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    const newNote: Note = {
      ...note,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    // Get existing notes
    const storedNotes = localStorage.getItem("notes");
    const notes = storedNotes ? JSON.parse(storedNotes) as Note[] : [];
    
    // Add new note and save
    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));
    
    return newNote;
  },
  
  updateNote: async (note: Note): Promise<Note> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    // Get existing notes
    const storedNotes = localStorage.getItem("notes");
    if (!storedNotes) {
      throw new Error("Note not found");
    }
    
    const notes = JSON.parse(storedNotes) as Note[];
    const noteIndex = notes.findIndex(n => n.id === note.id);
    
    if (noteIndex === -1) {
      throw new Error("Note not found");
    }
    
    // Update note
    const updatedNote = {
      ...note,
      updated_at: new Date().toISOString(),
    };
    
    notes[noteIndex] = updatedNote;
    localStorage.setItem("notes", JSON.stringify(notes));
    
    return updatedNote;
  },
  
  deleteNote: async (noteId: string): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    // Get existing notes
    const storedNotes = localStorage.getItem("notes");
    if (!storedNotes) {
      return;
    }
    
    const notes = JSON.parse(storedNotes) as Note[];
    const filteredNotes = notes.filter(note => note.id !== noteId);
    
    localStorage.setItem("notes", JSON.stringify(filteredNotes));
  },
};
