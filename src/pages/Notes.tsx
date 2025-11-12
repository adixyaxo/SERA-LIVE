import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StickyNote, Plus, Trash2, Search } from "lucide-react";
import { useState } from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
}

const initialNotes: Note[] = [
  {
    id: 1,
    title: "Project Ideas",
    content: "Brainstorming session for new features and improvements...",
    date: "2025-11-01"
  },
  {
    id: 2,
    title: "Meeting Notes",
    content: "Discussion points from today's standup meeting...",
    date: "2025-11-02"
  },
  {
    id: 3,
    title: "Learning Resources",
    content: "Collection of useful links and tutorials...",
    date: "2025-11-03"
  },
];

const Notes = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const createNote = () => {
    if (newNoteTitle.trim()) {
      const newNote = {
        id: Math.max(...notes.map(n => n.id), 0) + 1,
        title: newNoteTitle,
        content: newNoteContent,
        date: new Date().toISOString().split('T')[0]
      };
      setNotes([newNote, ...notes]);
      setNewNoteTitle("");
      setNewNoteContent("");
      setIsCreating(false);
      setSelectedNote(newNote);
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
    if (selectedNote?.id === id) setSelectedNote(null);
  };

  return (
    <div className="min-h-screen w-full">
      <Header />
      
      <main className="pt-32 sm:pt-28 pb-24 sm:pb-16 px-8 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="animate-fade-in glass p-6 rounded-3xl">
            <h1 className="text-3xl font-light mb-2">Notes</h1>
            <p className="text-muted-foreground">Capture your thoughts and ideas</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="relative rounded-3xl border-[0.75px] border-border p-2">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <Card className="glass border-0 rounded-2xl relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <StickyNote className="h-5 w-5 text-accent" />
                      All Notes
                    </CardTitle>
                    <Button
                      size="icon"
                      onClick={() => setIsCreating(true)}
                      className="rounded-full"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search notes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 rounded-2xl"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {filteredNotes.map((note) => (
                    <div
                      key={note.id}
                      onClick={() => setSelectedNote(note)}
                      className={`p-4 rounded-2xl cursor-pointer transition-smooth group ${
                        selectedNote?.id === note.id
                          ? "bg-accent/10"
                          : "hover:bg-background/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{note.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {note.content}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">{note.date}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNote(note.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 relative rounded-3xl border-[0.75px] border-border p-2">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <Card className="glass border-0 rounded-2xl relative">
                <CardContent className="p-6">
                  {isCreating ? (
                    <div className="space-y-4">
                      <Input
                        placeholder="Note title..."
                        value={newNoteTitle}
                        onChange={(e) => setNewNoteTitle(e.target.value)}
                        className="text-2xl font-light border-0 px-0 rounded-2xl"
                      />
                      <Textarea
                        placeholder="Start writing..."
                        value={newNoteContent}
                        onChange={(e) => setNewNoteContent(e.target.value)}
                        className="min-h-[400px] resize-none border-0 px-0 rounded-2xl"
                      />
                      <div className="flex gap-2">
                        <Button onClick={createNote} className="rounded-full">
                          Create Note
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setIsCreating(false);
                            setNewNoteTitle("");
                            setNewNoteContent("");
                          }}
                          className="rounded-full"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : selectedNote ? (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-light">{selectedNote.title}</h2>
                      <p className="text-sm text-muted-foreground">{selectedNote.date}</p>
                      <p className="text-foreground/90 whitespace-pre-wrap">{selectedNote.content}</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                      Select a note or create a new one
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notes;
