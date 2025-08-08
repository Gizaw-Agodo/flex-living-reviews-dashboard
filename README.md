# Flex Living Reviews Dashboard

This project is a full-stack developer assessment for Flex Living, focused on building a reviews dashboard and a public-facing display page. It demonstrates a structured approach to building a modern web application with a focus on code clarity, UI/UX design, and problem-solving initiative.

## Table of Contents
1. [Features](#1-features)
2. [Tech Stack](#2-tech-stack)
3. [Setup Instructions](#3-setup-instructions)
4. [Usage](#4-usage)

---

### 1. Features

- **Mock Hostaway Integration:** A backend API endpoint (`/api/reviews/hostaway`) that mocks the Hostaway Reviews API. It fetches, normalizes, and groups review data by listing from a local JSON file.
- **Structured Backend:** The backend is built with a clear separation of concerns using `controllers`, `services`, and `types` for scalability and maintainability.
- **Admin Dashboard:**
    - A main page displaying a list of all properties with key stats.
    - A dedicated, per-property dashboard with a professional UI.
    - Dynamic key metrics (Average Rating, Total Reviews, Approved Reviews) for the selected property.
    - Robust filtering and sorting by rating, category, and date.
    - A button on each review card to "Approve for Website."
- **Public-Facing Review Display Page:**
    - A separate, public page that simulates a Flex Living property details page.
    - Displays only the reviews that have been explicitly approved by the manager.
    - Features a beautiful, responsive layout with property details, amenities, and policies.

### 2. Tech Stack

- **Backend:** `Node.js` with `Express` and `TypeScript`. `ts-node-dev` is used for a smooth development experience.
- **Frontend:** `React` with `Vite` and `TypeScript`.
- **Styling:** `Tailwind CSS` for utility-first styling, enabling rapid and consistent UI development.
- **Routing:** `React Router` for client-side navigation.
- **State Management:** `React Context API` for shared state (`approvedReviews`) and `useState` for local component state.


### 3. Setup Instructions

To get the project running locally, please follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Gizaw-Agodo/flex-living-reviews-dashboard.git
    cd flex-living-reviews-dashboard
    ```

2.  **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

4.  **Start the backend server:**
    ```bash
    cd ../backend
    npm run dev
    ```
    The server will run on `http://localhost:5001`.

5.  **Start the frontend development server:**
    ```bash
    cd ../frontend
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### 4. Usage

- **Public View:**
    - The application loads at `http://localhost:5173/`. This is the public-facing list of properties.
    - Click any property card to be taken to its dedicated reviews page at `/reviews/:listingName`. This page displays details about the property and only the reviews that have been approved.

- **Admin View:**
    - Navigate to the admin home page at `http://localhost:5173/dashboard`.
    - This  page shows the list of properties for review management.
    - Click a property card on the admin listings page to enter its dedicated dashboard at `/dashboard/:listingName`.
    - On this page, you can use the filters, sorting, and the "Approve for Website" button to manage reviews for that specific property. The metrics will be updated in real-time.
