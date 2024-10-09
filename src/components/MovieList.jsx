import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://movieapp-server-m1rb.onrender.com/api/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Unable to load movies. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center">Loading movies...</div>;

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4" style={{ color: "#007BFF" }}>
        Movies
      </h2>
      <Row className="justify-content-center">
        {movies.map((movie) => (
          <Col xs={6} md={3} className="mb-4" key={movie._id}>
            <Card
              style={{
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
                height: "100%", // Ensures consistent height
              }}
            >
              <Card.Img
                variant="top"
                src={movie.posterUrl}
                alt={movie.title}
                style={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  height: "200px", // Adjusted height for smaller cards
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title
                  className="text-primary"
                  style={{ fontSize: "1rem" }}
                >
                  {movie.title}
                </Card.Title>
                <Card.Text style={{ fontSize: "0.9rem" }}>
                  {movie.description.length > 100
                    ? `${movie.description.substring(0, 100)}...`
                    : movie.description}
                </Card.Text>
                <Link to={`/book/${movie._id}`}>
                  <Button
                    variant="success"
                    style={{ borderRadius: "20px", fontSize: "0.85rem" }}
                  >
                    Book Now
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MovieList;
