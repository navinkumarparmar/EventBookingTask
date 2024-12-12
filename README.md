# Event Booking API

This is the backend for the Event Booking application, which provides functionality to manage events such as creating, viewing, updating, and deleting events. 


API Routes
Event Routes
GET /events
BASEURL : localhost:3003/api

Fetch all events with optional filters and pagination.
Example filters:
?start=2023-12-01&end=2023-12-31 (Filter by date range)
?page=1&limit=10 (Pagination)
POST /event?start=2024-12-01&end=2024-12-31events (Admin only)

Create a new event. Requires admin authentication.
event/register

POST /events/:id (Admin only)

Update an existing event by ID. Requires admin authentication.
PUT/event/eventsupdate

DELETE event/delete/:id (Admin only)
Delete an event by ID. Requires admin authentication.
Authentication
POST /user/register 
Register a new user (Admin role).
POST /user/login
Login and obtain a JWT for authentication

## Table of Contents

- [Project Setup](#project-setup)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Testing](#testing)
- [License](#license)

## Project Setup

Follow these steps to get your development environment up and running.
1. Clone the Repository
git clone https://github.com/navinkumarparmar/EventBookingTask.git
cd EventBookingTask
2. Install Dependencies
npm install

Set up environment variables (e.g., .env file):

MONGO_URI=mongodb://localhost:27017/event-booking
JWT_SECRET=your-jwt-secret-key

Start the server:
npm start



### Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)

### Installation

1. **Clone the repository:**
   Open your terminal or command prompt and clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/event-booking-api.git
