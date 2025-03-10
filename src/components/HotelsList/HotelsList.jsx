import React from "react";
import {
  Container,
  HotelCard,
  Image,
  HotelInfo,
  HotelInfoHeader,
  Actions,
  PriceDate,
  Reviews,
  Price,
  ImageAndInfo,
  DescriptionContent,
  DateInfo
} from "./HotelsList.styles";
import Button from "../../common/Button/Button";
import Review from "../Review/Review";
import { ratingSymbols } from '../../constants/constants';
import { parseDescription } from '../../utils/helpers';

const HotelsList = ({ hotels, hotelReviews, reviewsLoading, expandedHotels, getHotelReviews }) => {

  return (
    <Container>
      {hotels?.map((hotel) => {
        const isExpanded = expandedHotels?.includes(hotel?.sys?.id)
        const reviews = hotelReviews?.length ? hotelReviews[hotel?.sys?.id] : [];

        return (
          <HotelCard key={hotel.sys.id}>
            <ImageAndInfo>
              <Image src={hotel?.imagesCollection?.items[0]?.url} alt={hotel.imagesCollection?.items[0]?.title}/>
              <HotelInfo>
                <HotelInfoHeader>
                  <div>
                    <h2>{hotel?.name}</h2>
                    <div>{hotel?.city}, {hotel?.country}</div>
                  </div>
                  <DescriptionContent>{ratingSymbols[Math.round(hotel.rating)] || "No rating"}</DescriptionContent>
                </HotelInfoHeader>

                <p>{parseDescription(hotel?.description?.json)}</p>
                <Actions>
                  <Button onClick={() => getHotelReviews(hotel?.sys?.id)}>
                    {isExpanded ? "Hide Reviews" : "Show Reviews"}
                  </Button>
                  <PriceDate>
                    <Price>€{hotel?.price?.value?.toLocaleString("de-DE")}</Price>
                    <DateInfo>
                      {new Date(hotel?.startDate)?.toLocaleDateString("de-DE")} - {new Date(hotel?.endDate)?.toLocaleDateString("de-DE")}
                    </DateInfo>
                  </PriceDate>
                </Actions>
              </HotelInfo>
            </ImageAndInfo>
            {isExpanded && (
              <Reviews>
                {reviewsLoading ? <p>Loading reviews...</p> :
                  reviews?.length ? reviews.map((review) => (
                    <Review key={review.sys?.id} review={review} />
                  )) : <p>No reviews available.</p>}
              </Reviews>
            )}
          </HotelCard>
        )
      })}
    </Container>
  );
};

export default HotelsList;
