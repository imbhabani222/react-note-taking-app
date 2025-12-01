import { useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import type { Tag } from "../App";
import NoteCard, { type SimplifiedNote } from "../components/NoteCard";
import EditTagsModal from "../components/EditTagsModal";
import Masonry from "react-masonry-css";
import Lottie from "lottie-react";
import notebookAnimation from "../assets/Checklist Note Paper Text.json";

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

const NoteList = ({
  availableTags,
  notes,
  onUpdateTag,
  onDeleteTag,
}: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const titleMatch =
        title === "" || note.title.toLowerCase().includes(title.toLowerCase());
      const tagsMatch =
        selectedTags.length === 0 ||
        selectedTags.every((tag) =>
          note.tags.some((noteTag) => noteTag.id === tag.id)
        );

      return titleMatch && tagsMatch;
    });
  }, [notes, title, selectedTags]);

  const hasActiveFilters = title.trim() !== "" || selectedTags.length > 0;

  if (notes.length === 0) {
    return (
      <Container
        fluid
        className="py-5 d-flex justify-content-center align-items-center"
        style={{
          minHeight: "90vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Blobs */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            left: "-60px",
            width: "220px",
            height: "220px",
            background: "rgba(99, 102, 241, 0.15)",
            borderRadius: "50%",
            filter: "blur(50px)",
            zIndex: -1,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            right: "-60px",
            width: "260px",
            height: "260px",
            background: "rgba(16, 185, 129, 0.15)",
            borderRadius: "50%",
            filter: "blur(50px)",
            zIndex: -1,
          }}
        />

        <Row className="text-center">
          <Col>
            <Stack className="align-items-center">
              <Lottie
                animationData={notebookAnimation}
                loop
                autoplay
                style={{ width: "180px", height: "180px" }}
              />
            </Stack>

            <h1 className="fw-bold mt-4">
              Welcome to <span style={{ color: "#6366F1" }}>Your Notes</span>
            </h1>

            <p className="text-muted mx-auto" style={{ maxWidth: "450px" }}>
              Your thoughts, ideas, and tasks — organized beautifully. Start by
              creating your first note and make your productivity smoother.
            </p>

            <Stack className="d-flex justify-content-center gap-3 mt-4 flex-column flex-md-row">
              <Link to="/new">
                <Button
                  variant="primary"
                  size="lg"
                  style={{ borderRadius: "12px" }}
                >
                  Create Note
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline-secondary"
                  size="lg"
                  style={{ borderRadius: "12px" }}
                >
                  Learn More
                </Button>
              </Link>
            </Stack>

            <Card
              className="mt-5 shadow-sm mx-auto"
              style={{ maxWidth: "500px", borderRadius: "16px" }}
            >
              <Card.Body>
                <h5 className="fw-semibold mb-3">Tips to Get Started</h5>
                <ul className="text-start text-muted small mb-0">
                  <li>Create notes using the “+ Create Note” button.</li>
                  <li>Organize better by adding tags.</li>
                  <li>Use the search bar to quickly find your notes.</li>
                  <li>
                    Press <b>N</b> on your keyboard to create a note instantly.
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  const noFilteredResults = filteredNotes.length === 0;
  return (
    <>
      {/* Header */}
      <Row className="mb-4 flex-column flex-md-row align-items-left align-items-md-center">
        <Col>
          <h1 className="fw-bold">📝 Your Notes</h1>
          <p className="text-muted mt-2">
            Manage, organize, and explore your saved notes.
          </p>
        </Col>

        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button
                variant="primary"
                className="px-4 py-2"
                style={{ borderRadius: "12px" }}
              >
                ✨ Create Note
              </Button>
            </Link>

            <Button
              onClick={() => setEditTagsModalIsOpen(true)}
              variant="outline-secondary"
              className="px-4 py-2"
              style={{ borderRadius: "12px" }}
            >
              🏷️ Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>

      {/* Filters Section */}
      <div
        className="p-4 mb-4 shadow-sm bg-white"
        style={{
          borderRadius: "18px",
          border: "1px solid #f1f1f5",
        }}
      >
        <h5 className="fw-semibold mb-3">🔍 Filters</h5>

        <Form>
          <Row className="d-flex justify-content-center gap-3 mt-3 flex-column flex-md-row">
            <Col>
              <Form.Group controlId="title">
                <Form.Label className="fw-semibold">Search by Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  placeholder="Type to filter notes..."
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    borderRadius: "12px",
                    padding: "10px 14px",
                  }}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="tags">
                <Form.Label className="fw-semibold">Filter by Tags</Form.Label>
                <ReactSelect
                  isMulti
                  options={availableTags.map((tag) => ({
                    label: tag.label,
                    value: tag.id,
                  }))}
                  value={selectedTags.map((tag) => ({
                    label: tag.label,
                    value: tag.id,
                  }))}
                  onChange={(tags) => {
                    setSelectedTags(
                      tags.map((tag) => ({
                        label: tag.label,
                        id: tag.value,
                      }))
                    );
                  }}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "12px",
                      padding: "4px",
                    }),
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>

      <h5 className="fw-semibold mb-3">📚 All Notes</h5>
      {noFilteredResults ? (
        <div className="text-center py-5">
          <h3 className="fw-semibold text-muted">
            {hasActiveFilters
              ? "No notes match your filters"
              : "No notes found"}
          </h3>
          <p className="text-muted">
            {hasActiveFilters
              ? "Try adjusting your search or tags."
              : "Start by creating your first note!"}
          </p>
          {hasActiveFilters && (
            <Button
              variant="outline-primary"
              onClick={() => {
                setTitle("");
                setSelectedTags([]);
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <>
          <Masonry
            breakpointCols={{
              default: 4,
              1200: 3,
              900: 2,
              576: 1,
            }}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {filteredNotes.map((note) => (
              <div key={note.id} className="mb-4">
                <NoteCard id={note.id} title={note.title} tags={note.tags} />
              </div>
            ))}
          </Masonry>
        </>
      )}
      <EditTagsModal
        availableTags={availableTags}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />
    </>
  );
};

export default NoteList;
