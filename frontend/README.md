# Flex Living Reviews Dashboard

This project is a full-stack developer assessment for Flex Living, focused on building a reviews dashboard and a public-facing display page. It demonstrates a structured approach to building a modern web application with a focus on code clarity, UI/UX design, and problem-solving initiative.

## Table of Contents
1. [Features](#1-features)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Setup Instructions](#4-setup-instructions)
5. [Usage](#5-usage)
6. [Design and Logic Decisions](#6-design-and-logic-decisions)
7. [Google Reviews Findings (Exploration)](#7-google-reviews-findings-exploration)

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
- **Shared & Persistent State:** The approved reviews list is managed with React Context and persisted in `localStorage` to survive page refreshes and navigation.

### 2. Tech Stack

- **Backend:** `Node.js` with `Express` and `TypeScript`. `ts-node-dev` is used for a smooth development experience.
- **Frontend:** `React` with `Vite` and `TypeScript`.
- **Styling:** `Tailwind CSS` for utility-first styling, enabling rapid and consistent UI development.
- **Routing:** `React Router` for client-side navigation.
- **State Management:** `React Context API` for shared state (`approvedReviews`) and `useState` for local component state.


### 4. Setup Instructions

To get the project running locally, please follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [your-repo-url]
    cd flex-living-reviews
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
    npm start
    ```
    The server will run on `http://localhost:5000`.

5.  **Start the frontend development server:**
    ```bash
    cd ../frontend
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### 5. Usage

- **Admin View:**
    - Navigate to the admin home page: `http://localhost:5173/`
    - Click "View All Properties" to see a list of all listings.
    - Click a property card to enter its dedicated dashboard (`/dashboard/:listingName`).
    - Use the filters, sorting, and the "Approve for Website" button to manage reviews for that specific property.

- **Public View:**
    - Navigate to the public listings page: `http://localhost:5173/properties`
    - Click a property card to see its public-facing details page (`/reviews/:listingName`).
    - Only the reviews that have been approved in the admin dashboard will be displayed here. The `localStorage` ensures your selections are saved across sessions.

### 6. Design and Logic Decisions

- **Backend Data Structure:** The decision was made to read both the `mock-listings.json` and `mock-reviews.json` files and join them on the backend. This returns a single, comprehensive `ReviewsApiPayload` object, which is a more efficient and professional way to structure the data for the frontend.
- **Separation of Concerns:** The application is cleanly divided into public and admin sections, each with its own header, components, and logic. This prevents code intertwining and improves maintainability.
- **UI/UX Design:** The design prioritizes clarity and a modern aesthetic inspired by the provided screenshots. The dashboard provides clear metrics and filters, while the public pages are visually appealing and easy to navigate for a potential guest.
- **State Management:** `React Context API` was used for the `approvedReviews` state because it needs to be shared across multiple pages and components. `localStorage` was integrated into the context to ensure this state persists on page refresh, which is critical for the application to function correctly.
- **Code Modularity:** Reusable components like `ListingCard`, `ReviewCard`, `PublicHeader`, and `AdminHeader` were created. This prevents code duplication and makes the application easier to scale.

### 7. Google Reviews Findings (Exploration)

The Google Reviews integration would primarily be handled on the backend.

**Feasibility:**
- **Places API:** This is the most common way to get reviews for a business. However, it only provides a maximum of 5 of the most relevant reviews, which is insufficient for a comprehensive dashboard. It is a good option for displaying a small, sample set of reviews on the public page.
- **Google My Business API:** This API provides access to all reviews but requires the account manager to have an authenticated Google My Business profile. This would require an OAuth2 authentication flow on the backend.

**Implementation Strategy:**
- A new service would be created in the backend (e.g., `googleReviews.service.ts`) to make authenticated requests to the Google API.
- This service would normalize the Google Reviews data to match the `NormalizedReview` interface, with the `channel` set to `"Google Reviews"`.
- The frontend's `Filters` component would be updated to include a "Google Reviews" option in the channel filter.
- The manager's dashboard would then display Google Reviews alongside Hostaway reviews, providing a unified view.

Given the scope of this assessment, the Places API is a feasible, basic integration, while the My Business API is a more complex, but full-featured solution that would be the best long-term choice.