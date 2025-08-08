import type { Listing } from '../types/review.types';
import { FaWifi, FaKitchenSet, FaSquareParking, FaShare, FaSun, FaClock, FaSass, FaPaw, FaBan, FaSellsy } from 'react-icons/fa6';
import { FaBed, FaBath, FaUserFriends } from 'react-icons/fa';

interface PropertyDetailsProps {
  listing: Listing;
}

const PropertyDetails = ({ listing }: PropertyDetailsProps) => {
  const amenities = [
    { icon: FaWifi, text: 'Free Wi-Fi' },
    { icon: FaKitchenSet, text: 'Fully Equipped Kitchen' },
    { icon: FaSquareParking, text: 'Free Parking' },
    { icon: FaShare, text: 'Shampoo' },
    { icon: FaSun, text: 'Outdoor Space' },
    { icon: FaClock, text: '24/7 Check-in' },
  ];
  
  const houseRules = [
    { icon: FaSass, text: 'No smoking' },
    { icon: FaPaw, text: 'No pets' },
    { icon: FaBan, text: 'No parties or events' },
    { icon: FaSellsy, text: 'Security deposit required' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">About this property</h2>
      <p className="text-gray-600 mb-6">
        I'd love to welcome you to this cozy apartment in {listing.city}, perfect for up to {listing.guests} guests.
        It features {listing.bedrooms} bedrooms, each with a comfortable double bed for 2 people,
        and a living room with an extra single bed for one more guest. The apartment also has {listing.bathrooms} bathroom and a fully equipped kitchen.
      </p>

      <div className="flex items-center space-x-6 text-gray-600 text-sm mb-6">
        <div className="flex items-center space-x-2">
          <FaBed className="text-gray-400" />
          <span>{listing.bedrooms} Bedrooms</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaBath className="text-gray-400" />
          <span>{listing.bathrooms} Bathroom</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaUserFriends className="text-gray-400" />
          <span>Up to {listing.guests} guests</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <amenity.icon className="text-indigo-500 text-xl" />
            <span className="text-gray-700">{amenity.text}</span>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Policies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 flex items-center space-x-2 mb-2">
            <FaClock className="text-indigo-500" />
            <span>Check-in & Check-out</span>
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Check-in time: <strong>3:00 PM</strong></p>
            <p>Check-out time: <strong>10:00 AM</strong></p>
          </div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 flex items-center space-x-2 mb-2">
            <FaBan className="text-red-500" />
            <span>House Rules</span>
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {houseRules.map((rule, index) => (
              <li key={index} className="flex items-center space-x-2">
                <rule.icon className="text-red-500" />
                <span>{rule.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;