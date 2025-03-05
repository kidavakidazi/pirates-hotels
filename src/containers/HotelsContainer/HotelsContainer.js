import React, { useState } from "react";
import { useHotels } from "../../hooks/useHotels";
import { useReviews } from "../../hooks/useReviews";
import HotelsList from "../../components/HotelsList/HotelsList";
import Button from '../../common/Button';

const HotelsContainer = () => {
  const { fetchHotels, hotelsLoading, hotelsError, hotels } = useHotels();
  const { fetchReviews, reviewsLoading, reviewsError, reviews } = useReviews();
  const [expandedHotel, setExpandedHotel] = useState(null);

  if (hotelsLoading) return <p>Loading hotels...</p>;
  if (hotelsError) return <p>Error loading hotels.</p>;

  return (
    <>
      <Button onClick={() => fetchHotels()} disabled={hotelsLoading} loading={hotelsLoading} >
        "Load Hotels"
      </Button>
      <HotelsList
        hotels={hotels}
        fetchReviews={fetchReviews}
        reviews={reviews}
        reviewsLoading={reviewsLoading}
        reviewsError={reviewsError}
        expandedHotel={expandedHotel}
        setExpandedHotel={setExpandedHotel}
      />
    </>
  );
};

export default HotelsContainer;