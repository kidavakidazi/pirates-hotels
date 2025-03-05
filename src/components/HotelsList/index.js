import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_HOTELS, GET_REVIEWS } from "../../queries/queries";
import styled from "styled-components";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

const ratingSymbols = {
  0: "No Rating",
  1: "⭐",
  2: "⭐⭐",
  3: "⭐⭐⭐",
  4: "⭐⭐⭐⭐",
  5: "⭐⭐⭐⭐⭐",
};

const HotelsList = () => {
  const [fetchHotels, { loading, error, data }] = useLazyQuery(GET_HOTELS);
  const [loadReviews, { loading: reviewLoading, data: reviewData }] = useLazyQuery(GET_REVIEWS);
  const [expandedHotel, setExpandedHotel] = useState(null);

  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p>Error loading hotels.</p>;

  return (
    <Container>
      <Button onClick={() => fetchHotels()} disabled={loading}>
        {loading ? "Loading..." : "Load Hotels"}
      </Button>
      {data?.hotelCollection?.items?.map((hotel) => (
        <HotelCard key={hotel.sys.id}>
          <Image src={hotel.imagesCollection.items[0].url} alt={hotel.imagesCollection.items[0].title} />
          <HotelInfo>
            <h2>{hotel.name}</h2>
            <p>{hotel.city}, {hotel.country}</p>
            <p>{ratingSymbols[Math.round(hotel.rating)] || "No rating"}</p>
            <p>{documentToPlainTextString(hotel.description)}</p>
            <Actions>
              <Button onClick={() => {
                loadReviews({ variables: { hotelId: hotel.sys?.id } });
                setExpandedHotel(expandedHotel === hotel.sys?.id ? null : hotel.sys?.id);
              }}>
                {expandedHotel === hotel.sys.id ? "Hide Reviews" : "Show Reviews"}
              </Button>
              <Price>€{hotel.price.value.toLocaleString("de-DE")}</Price>
            </Actions>
            {expandedHotel === hotel.sys.id && (
              <Reviews>
                {reviewLoading ? <p>Loading reviews...</p> :
                  reviewData?.reviewCollection.items.length ? reviewData.reviewCollection.items.map((review, index) => (
                    <Review key={index}>
                      <strong>{review.author}</strong>: {review.comment}
                    </Review>
                  )) : <p>No reviews available.</p>}
              </Reviews>
            )}
          </HotelInfo>
        </HotelCard>
      ))}
    </Container>
  );
};

export default HotelsList;

const Container = styled.div`
  padding: 20px;
`;

const Button = styled.button`
  margin-bottom: 20px;
  padding: 10px;
  cursor: pointer;
  background: #0073e6;
  color: white;
  border: none;
  border-radius: 5px;
`;

const HotelCard = styled.div`
  display: flex;
  background: #f9f9f9;
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
`;

const Image = styled.img`
  width: 400px;
  height: 300px;
  object-fit: cover;
`;

const HotelInfo = styled.div`
  padding: 15px;
  flex: 1;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Price = styled.span`
  font-weight: bold;
  color: #0073e6;
`;

const Reviews = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: #eee;
  border-radius: 5px;
`;

const Review = styled.p`
  margin: 5px 0;
  font-size: 14px;
`;
