import React from "react";
import { useHotels } from "../../hooks/useHotels";
import HotelsList from "../../components/HotelsList/HotelsList";
import Button from '../../common/Button';
import { css } from "styled-components";

const HotelsContainer = () => {
  const { fetchHotels, hotelsLoading, hotelsError, hotels, getHotelReviews, expandedHotels, hotelReviews } = useHotels();

  return (
    <>
      <Button
        onClick={fetchHotels}
        disabled={hotelsLoading}
        loading={hotelsLoading}
        customcss={css`margin: 24px auto;`}
      >
        Load Hotels
      </Button>

      {hotelsLoading && <p>Loading hotels...</p>}
      {hotelsError && <p>Error loading hotels.</p>}

      {hotels.length > 0 && (
        <HotelsList
          hotels={hotels}
          expandedHotels={expandedHotels}
          hotelReviews={hotelReviews}
          getHotelReviews={getHotelReviews}
        />
      )}
    </>
  );
};

export default HotelsContainer;
