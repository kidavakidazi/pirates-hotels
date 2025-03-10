import { useLazyQuery } from "@apollo/client";
import { GET_HOTELS } from "../queries/queries";
import { GET_REVIEWS } from "../queries/queries";
import { useState } from 'react';

export const useHotels = () => {
  const [fetchHotels, { loading: hotelsLoading, error: hotelsError, data: hotelsData }] = useLazyQuery(GET_HOTELS);
  const [fetchReviews, { loading, error, data }] = useLazyQuery(GET_REVIEWS);
  const [expandedHotels, setExpandedHotels] = useState([]);
  const [hotelReviews, setHotelReviews] = useState({});

  const getHotelReviews = async (hotelId) => {
    if (!expandedHotels.includes(hotelId)) {
      setExpandedHotels((prev) => [...prev, hotelId]);

      try {
        const { data } = await fetchReviews({ variables: { hotelId } });

        setHotelReviews((prev) => ({
          ...prev,
          [hotelId]: data?.reviewCollection?.items,
        }));
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setHotelReviews((prev) => ({ ...prev, [hotelId]: [] }));
      }
    } else {
      setExpandedHotels((prev) => prev.filter(id => id !== hotelId));
    }
  };

  return {
    fetchReviews,
    reviewsLoading: loading,
    reviewsError: error,
    expandedHotels,
    setExpandedHotels,
    getHotelReviews,
    hotelReviews,
    fetchHotels,
    hotelsLoading,
    hotelsError,
    hotels: hotelsData?.hotelCollection?.items || [],
  };
};
