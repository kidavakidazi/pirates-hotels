import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
`;

export const HotelCard = styled.div`
    display: flex;
    flex-direction: column;
    background: #f9f9f9;
    border-radius: 10px;
    margin-bottom: 20px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ImageAndInfo = styled.div`
    display: flex;
    gap: 20px;
    padding: 15px;
`;

export const Image = styled.img`
    width: 300px;
    height: 225px;
    object-fit: cover;
    border-radius: 10px;
`;

export const HotelInfo = styled.div`
    flex: 1;
`;

export const HotelInfoHeader = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: space-between;
`;

export const DescriptionContent = styled.div`
    font-size: 16px;
`

export const Actions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;

export const PriceDate = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: space-between;
`;

export const Price = styled.span`
    font-weight: bold;
    color: #0073e6;
`;

export const DateInfo = styled.div`
  font-size: 14px;
  color: #555;
  margin-top: 8px;
`;

export const Reviews = styled.div`
  width: 100%;
  padding: 15px;
  background: #f1f1f1;
  border-top: 1px solid #ddd;
`;