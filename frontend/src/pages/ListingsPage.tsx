import { useFetchReviews } from '../hooks/useFetchReviews';
import ListingCard from '../components/ListingCard';
import LoadingIndicator from '../components/LoadingIndicator';
import PublicHeader from '../components/header/PublicHeader';

interface ListingPageProps {
  isAdmin?: boolean; 
}
const ListingPage = ({ isAdmin = false }: ListingPageProps)  => {
  const { data, loading, error } = useFetchReviews();

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-20">Error: {error.message}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <PublicHeader/>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Flex Living Properties</h1>
        <p className="text-lg text-gray-600 mb-8">Click a property to view its reviews.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map(({ listing, reviews }) => (
            <ListingCard
              key={listing.name}
              listing={listing}
              reviews={reviews}
              isAdmin = {isAdmin}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ListingPage;