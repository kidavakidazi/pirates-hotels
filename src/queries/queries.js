import { gql } from "@apollo/client";

export const GET_HOTELS = gql`
    query {
        hotelCollection(limit: 5) {
            items {
                name
                rating
                price
                country
                city
                startDate
                endDate
                sys {
                    id
                }
                imagesCollection {
                    items {
                        url
                        width
                        height
                        title
                    }
                }
            }
        }
    }
`;

export const GET_REVIEWS = gql`
    query GetReviews($hotelId: String!) {
        reviewCollection(where: { hotelId: $hotelId } limit: 3) {
            items {
                customer {
                    firstName
                    lastName
                }
                feedback
                comment {
                    json
                }
            }
        }
    }
`;