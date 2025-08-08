import { Link } from 'react-router-dom';
import flexLogo from '/assets/flex_logo.png';

const AdminHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <img src={flexLogo} alt="The Flex Logo" className="h-8" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800 mt-4 ml-10">Admin Dashboard</h1>
        </div>
        <div className="flex items-center space-x-6">
          <p className="text-gray-600 hidden md:block">Welcome, Manager</p>
          <Link
            to="/"
            className="border-2 border-indigo-600 text-indigo-600 font-bold py-2 px-4 rounded-full transition-colors hover:bg-indigo-600 hover:text-white text-sm"
          >
            View Public Site
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;