import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Alert,
  ListGroup,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const MyBookings = () => {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setBookings([]);
    setLoading(true);

    fetch(
      `https://movieapp-server-m1rb.onrender.com/api/bookings?email=${encodeURIComponent(
        email
      )}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        return response.json();
      })
      .then((data) => {
        setBookings(data);
        if (data.length === 0) {
          setError("No bookings found for this email.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while fetching bookings.");
        setLoading(false);
      });
  };

  const handleDelete = (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    fetch(
      `https://movieapp-server-m1rb.onrender.com/api/bookings/${bookingId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete booking");
        }
        return response.json();
      })
      .then(() => {
        alert("Booking deleted successfully.");
        setBookings((prevBookings) =>
          prevBookings.filter((b) => b._id !== bookingId)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to delete booking. Please try again.");
      });
  };

  const handleEdit = (bookingId) => {
    navigate(`/edit-booking/${bookingId}`);
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4" style={{ color: "#007BFF" }}>
        My Bookings
      </h2>
      <Form
        onSubmit={handleSubmit}
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            style={{
              borderRadius: "30px",
              backgroundColor: "#e0f7fa",
              border: "1px solid #007BFF",
            }}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          style={{ width: "100%", borderRadius: "30px" }}
        >
          View Bookings
        </Button>
      </Form>

      {loading && <div className="text-center mt-3">Loading bookings...</div>}

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {bookings.length > 0 && (
        <div className="mt-4">
          <h3>Your Bookings:</h3>
          <ListGroup>
            {bookings.map((booking) => (
              <ListGroup.Item
                key={booking._id}
                className="mb-2"
                style={{ backgroundColor: "#B2EBF2", borderRadius: "15px" }}
              >
                <Card style={{ borderRadius: "15px", border: "none" }}>
                  <Card.Body>
                    <Card.Title className="text-primary">
                      {booking.movie.title}
                    </Card.Title>
                    <Card.Text>
                      <strong>Showtime:</strong> {booking.showtime} <br />
                      <strong>Seats:</strong> {booking.seats} <br />
                      <strong>Booking Date:</strong>{" "}
                      {new Date(booking.bookingDate).toLocaleString()}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="warning"
                        onClick={() => handleEdit(booking._id)}
                        className="mr-2"
                        style={{ borderRadius: "20px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(booking._id)}
                        style={{ borderRadius: "20px" }}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </Container>
  );
};

export default MyBookings;
