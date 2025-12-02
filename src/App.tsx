import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Stack } from "react-bootstrap";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
import React, { Suspense, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

// Lazy-loaded pages (code-splitting)
const NewNote = React.lazy(() => import("./pages/NewNote"));
const NoteList = React.lazy(() => import("./pages/NoteList"));
const NoteLayout = React.lazy(() => import("./layouts/NoteLayout"));
const Note = React.lazy(() => import("./pages/Note"));
const EditNote = React.lazy(() => import("./pages/EditNote"));
const About = React.lazy(() => import("./pages/About"));
const Footer = React.lazy(() => import("./components/Footer"));

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markDown: string;
  tags: Tag[];
};

type RawNote = {
  id: string;
} & RawNoteData;

type RawNoteData = {
  title: string;
  markDown: string;
  tagIds: string[];
};

export type Tag = {
  id: string;
  label: string;
};

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "n") {
        navigate("/new");
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [navigate]);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => ({
      ...note,
      tags: tags.filter((tag) => note?.tagIds?.includes(tag.id)),
    }));
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prev) => [
      ...prev,
      { ...data, id: uuidv4(), tagIds: tags.map((t) => t.id) },
    ]);
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, ...data, tagIds: tags.map((t) => t.id) }
          : note
      )
    );
  }

  function onDeleteNote(id: string) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  function updateTag(id: string, label: string) {
    setTags((prev) => prev.map((t) => (t.id === id ? { ...t, label } : t)));
  }

  function deleteTag(id: string) {
    setTags((prev) => prev.filter((t) => t.id !== id));
  }

  const showFooter = !isHomePage || (isHomePage && notesWithTags.length > 0);

  const showGithubButton = isHomePage && notesWithTags.length === 0;

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        <Container className="my-4">
          <Suspense
            fallback={
              <Stack
                className="w-100 justify-content-center align-items-center"
                style={{ height: "100vh" }}
              >
                <span className="loader"></span>
              </Stack>
            }
          >
            <Routes>
              <Route
                path="/"
                element={
                  <NoteList
                    availableTags={tags}
                    notes={notesWithTags}
                    onUpdateTag={updateTag}
                    onDeleteTag={deleteTag}
                  />
                }
              />

              <Route path="/about" element={<About />} />

              <Route
                path="/new"
                element={
                  <NewNote
                    onSubmit={onCreateNote}
                    onAddTag={addTag}
                    availableTags={tags}
                  />
                }
              />

              <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
                <Route index element={<Note onDelete={onDeleteNote} />} />
                <Route
                  path="edit"
                  element={
                    <EditNote
                      onSubmit={onUpdateNote}
                      onAddTag={addTag}
                      availableTags={tags}
                    />
                  }
                />
              </Route>

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </Container>
      </main>

      {showGithubButton && (
        <a
          href="https://github.com/Priyammondal/react-note-taking-app"
          target="_blank"
          rel="noopener noreferrer"
          className="github-icon btn position-fixed bottom-0 end-0 m-3 rounded-circle d-none d-md-flex align-items-center justify-content-center"
        >
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-github-with-cat-logo-an-online-community-for-software-development-logo-color-tal-revivo.png"
            alt="GitHub"
          />
        </a>
      )}

      {showFooter && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </div>
  );
};

export default App;
