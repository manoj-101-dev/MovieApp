# Movie Booking Application - Frontend

This is the frontend for the **Movie Booking Application**, built using React and React Bootstrap. It provides a user-friendly interface for users to register, log in, view movies, and make bookings.

## Features

- **User Authentication**: Users can sign up and log in using JWT-based authentication.
- **Movie Listings**: Display a list of available movies.
- **Booking Management**: Users can create, view, edit, and delete their movie bookings.
- **Protected Routes**: Certain routes are protected, ensuring only authenticated users can access them.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **React Router**: For handling navigation and routing.
- **React Bootstrap**: For responsive UI components.
- **Fetch API**: For making HTTP requests to the backend API.
- **JWT (JSON Web Tokens)**: Used for authentication.

## Getting Started

### Prerequisites

To run the project locally, ensure that you have the following installed:

- Node.js (v14+)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/movie-booking-app-frontend.git
   cd movie-booking-app-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```

4. The frontend will start at `http://localhost:3000/`.

### API Integration

The frontend communicates with the backend server via RESTful API endpoints. Make sure the backend server is running before starting the frontend.

### Environment Variables

You can create a `.env` file in the root directory for environment variables if needed.


