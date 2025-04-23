
import Header from "@/components/layout/Header";
import NoteGrid from "@/components/notes/NoteGrid";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">My Notes</h1>
          <p className="text-muted-foreground">Create, manage and summarize your notes with AI</p>
        </div>
        <NoteGrid />
      </main>
    </div>
  );
}
