import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const BookingForm = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    showtime: "",
    seats: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Fetching movie with ID:", movieId);
    fetch(`https://movieapp-server-m1rb.onrender.com/api/movies/${movieId}`)
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched movie data:", data);
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie:", error);
        setError("Unable to load movie details. Please try again later.");
        setLoading(false);
      });
  }, [movieId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    fetch("https://movieapp-server-m1rb.onrender.com/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie: movieId,
        ...form,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create booking");
        }
        return response.json();
      })
      .then(() => {
        alert("Booking successful!");
        navigate("/HomePage");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Booking failed. Please try again.");
      });
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  if (error)
    return (
      <Container>
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      </Container>
    );

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Book {movie.title}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="userEmail"
                value={form.userEmail}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formShowtime">
              <Form.Label>Showtime</Form.Label>
              <Form.Select
                name="showtime"
                value={form.showtime}
                onChange={handleChange}
                required
              >
                <option value="">Select Showtime</option>
                {movie.showtimes.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSeats">
              <Form.Label>Number of Seats</Form.Label>
              <Form.Control
                type="number"
                name="seats"
                value={form.seats}
                onChange={handleChange}
                min="1"
                required
              />
            </Form.Group>
            <div className="d-grid">
              <Button variant="success" type="submit" size="lg">
                Book Now
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingForm;
