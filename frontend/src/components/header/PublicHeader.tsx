import { Link } from 'react-router-dom';
import flexLogo from '/assets/flex_logo.png';

const PublicHeader = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={flexLogo} alt="The Flex Logo" className="h-8" />
        </Link>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-6 text-gray-600">
            <a href="#" className="hover:text-indigo-600 font-medium">Landlords</a>
            <a href="#" className="hover:text-indigo-600 font-medium">About Us</a>
          </nav>
          <Link
            to="/dashboard"
            className="border-2 border-indigo-600 text-indigo-600 font-bold py-2 px-4 rounded-full transition-colors hover:bg-indigo-600 hover:text-white text-sm ml-4"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;