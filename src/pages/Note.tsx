import { Link, useNavigate } from "react-router-dom";
import { useNote } from "../layouts/NoteLayout";
import { Button, Col, Row, Stack, Card, Badge } from "react-bootstrap";
import Markdown from "react-markdown";
import styles from "../styles/Note.module.css";

type NoteProps = {
  onDelete: (id: string) => void;
};

const Note = ({ onDelete }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <div className="pb-5">
      {/* Page Header */}
      <Row className="mb-4 flex-column flex-md-row align-items-left align-items-md-center gap-2">
        <Col>
          <h2
            className="fw-semibold"
            style={{ color: "#222", letterSpacing: "-0.5px" }}
          >
            {note.title}
          </h2>

          {/* Tags */}
          {note.tags.length > 0 && (
            <Stack
              direction="horizontal"
              gap={2}
              className="flex-wrap mt-2"
              style={{ rowGap: "6px" }}
            >
              {note.tags.map((tag) => (
                
                <Badge
                    key={tag.id}
                    bg="primary"
                    pill
                    text="light"
                    className="px-3 py-2 fw-medium shadow-sm"
                >
                    {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>

        {/* Action Buttons */}
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to={`/${note.id}/edit`}>
              <Button style={{ borderRadius: "12px" }} variant="outline-primary">
                Edit
              </Button>
            </Link>

            <Button
              style={{ borderRadius: "12px" }}
              variant="outline-danger"
              onClick={() => {
                onDelete(note.id);
                navigate("/");
              }}
            >
              Delete
            </Button>

            <Link to="..">
              <Button
                style={{ borderRadius: "12px" }}
                variant="outline-secondary"
              >
                Back
              </Button>
            </Link>
          </Stack>
        </Col>
      </Row>

      {/* Note Body */}
      <Card
        className="shadow-sm border-0"
        style={{
          borderRadius: "18px",
          padding: "1.8rem",
          background: "white",
          minHeight:"500px"
         
        }}
      >
        <div className={styles.markdownBody}>
          <Markdown>{note.markDown}</Markdown>
        </div>
      </Card>
    </div>
  );
};

export default Note;
