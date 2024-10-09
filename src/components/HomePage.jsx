import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <Container fluid className="bg-light ">
      <header className="d-flex justify-content-between align-items-center my-4 px-5">
        <h1 className="text-primary mx-auto">
          Welcome to the Movie Booking App
        </h1>
        <Button variant="outline-danger" onClick={handleLogout}>
          Logout
        </Button>
      </header>
      <main>
        <h2 className="text-center mb-4 text-success">Available Options</h2>
        <Row className="justify-content-center mb-5">
          {/* Added additional margin for more space */}
          <Col md={4} className="mb-4">
            <Card className="shadow-lg border-light">
              <Card.Body>
                <Card.Title className="text-primary">View Movies</Card.Title>
                <Card.Text>
                  Explore our latest movie selections and book your tickets.
                </Card.Text>
                <Link to="/movieList" style={{ textDecoration: "none" }}>
                  <Button variant="success">View Movies</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4 ">
            <Card className="shadow-lg border-light">
              <Card.Body>
                <Card.Title className="text-primary">
                  View My Bookings
                </Card.Title>
                <Card.Text>
                  Check your existing bookings and manage them easily.
                </Card.Text>
                <Link to="/bookings" style={{ textDecoration: "none" }}>
                  <Button variant="success">My Bookings</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </main>
      <footer className="text-center mt-4">
        <p className="text-muted">&copy; 2024 Movie Booking App</p>
      </footer>
    </Container>
  );
};

export default HomePage;
