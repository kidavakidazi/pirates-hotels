import React from "react";
import { Container, HotelCard, Image, HotelInfo, Actions, Reviews, Price, ImageAndInfo } from "./HotelsList.styles";
import Button from "../../common/Button/Button";
import Review from "../Review/Review";
import { ratingSymbols } from '../../constants/constants';
import { parseDescription } from '../../utils/helpers';

const HotelsList = ({ hotels, fetchReviews, reviews, reviewsLoading, expandedHotel, setExpandedHotel }) => {
  return (
    <Container>
      {hotels?.map((hotel) => (
        <HotelCard key={hotel.sys.id}>
          <ImageAndInfo>
            <Image src={hotel.imagesCollection.items[0].url} alt={hotel.imagesCollection.items[0].title} />
            <HotelInfo>
              <h2>{hotel.name}</h2>
              <p>{hotel.city}, {hotel.country}</p>
              <p>{ratingSymbols[Math.round(hotel.rating)] || "No rating"}</p>
              <p>{parseDescription(hotel.description.json)}</p>
              <Actions>
                <Button onClick={() => {
                  fetchReviews({ variables: { hotelId: hotel.sys?.id } });
                  setExpandedHotel(expandedHotel === hotel.sys?.id ? null : hotel.sys?.id);
                }}>
                  {expandedHotel === hotel.sys.id ? "Hide Reviews" : "Show Reviews"}
                </Button>
                <Price>€{hotel.price.value.toLocaleString("de-DE")}</Price>
              </Actions>
            </HotelInfo>
          </ImageAndInfo>
          {expandedHotel === hotel.sys.id && (
            <Reviews>
              {reviewsLoading ? <p>Loading reviews...</p> :
                reviews?.length ? reviews.map((review) => (
                  <Review key={review.sys?.id} review={review} />
                )) : <p>No reviews available.</p>}
            </Reviews>
          )}
        </HotelCard>
      ))}
    </Container>
  );
};

export default HotelsList;
