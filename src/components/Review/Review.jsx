import React from "react";
import { ReviewContainer, FeedbackIndicator, ReviewContent } from "./Review.styles";
import { parseDescription } from '../../utils/helpers';

const Review = ({ review }) => {
  return (
    <ReviewContainer>
      <FeedbackIndicator feedback={review?.feedback} />
      <ReviewContent>
        <header>
          <strong>{review?.customer?.firstName} {review?.customer?.lastName}</strong>
        </header>
          <p>{parseDescription(review?.comment?.json)}</p>
      </ReviewContent>
    </ReviewContainer>
  );
};

export default Review;