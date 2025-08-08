import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListingsPage from './pages/ListingsPage';
import AdminDashboard from './pages/AdminDashboard'; 
import { ReviewProvider } from './contexts/ReviewContext';
import ReviewDisplayPage from './pages/ReviewDisplayPage';
import PropertyDashboard from './pages/PropertyDashboard';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <BrowserRouter>
        <ReviewProvider>
          <Routes>
            <Route path="/" element={<ListingsPage />} /> 
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/dashboard/:listingName" element={<PropertyDashboard />} />
            <Route path="/reviews/:listingName" element={<ReviewDisplayPage />} />
          </Routes>
        </ReviewProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;