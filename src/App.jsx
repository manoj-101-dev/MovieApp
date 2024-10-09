// frontend/src/App.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import BookingForm from "./components/BookingForm";
import MyBookings from "./components/MyBookings";
import EditBooking from "./components/EditBooking";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Protect the HomePage */}
            <Route
              path="/HomePage"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            {/* Protect movie booking routes */}
            <Route
              path="/book/:movieId"
              element={
                <ProtectedRoute>
                  <BookingForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/movieList"
              element={
                <ProtectedRoute>
                  <MovieList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-booking/:bookingId"
              element={
                <ProtectedRoute>
                  <EditBooking />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
