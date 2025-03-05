import { useLazyQuery } from "@apollo/client";
import { GET_HOTELS } from "../queries/queries";

export const useHotels = () => {
  const [fetchHotels, { loading, error, data }] = useLazyQuery(GET_HOTELS);

  return {
    fetchHotels,
    hotelsLoading: loading,
    hotelsError: error,
    hotels: data?.hotelCollection?.items || [],
  };
};
