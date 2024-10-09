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

const EditBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    showtime: "",
    seats: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Fetching booking with ID:", bookingId);
    fetch(`https://movieapp-server-m1rb.onrender.com/api/bookings/${bookingId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch booking details");
        }
        return response.json();
      })
      .then((data) => {
        setBooking(data);
        setForm({
          userName: data.userName,
          userEmail: data.userEmail,
          showtime: data.showtime,
          seats: data.seats,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching booking:", error);
        setError("Unable to load booking details. Please try again later.");
        setLoading(false);
      });
  }, [bookingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    fetch(
      `https://movieapp-server-m1rb.onrender.com/api/bookings/${bookingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update booking");
        }
        return response.json();
      })
      .then(() => {
        alert("Booking updated successfully!");
        navigate("/bookings");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to update booking. Please try again.");
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
          <h2 className="text-center mb-4">
            Edit Booking for {booking?.movie?.title}
          </h2>
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
                {booking?.movie?.showtimes?.map((time, index) => (
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
                Update Booking
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditBooking;
