import { useLazyQuery } from "@apollo/client";
import { GET_REVIEWS } from "../queries/queries";

export const useReviews = () => {
  const [fetchReviews, { loading, error, data }] = useLazyQuery(GET_REVIEWS);

  return {
    fetchReviews,
    reviewsLoading: loading,
    reviewsError: error,
    reviews: data?.reviewCollection?.items || [],
  };
};
