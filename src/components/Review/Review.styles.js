import styled from "styled-components";

export const ReviewContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
    padding: 10px;
    background: white;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FeedbackIndicator = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: ${({ feedback }) => (feedback === "positive" ? "#4CAF50" : "#F44336")};
    color: white;
    font-weight: bold;
    margin: 0 10px;
    font-size: 24px;
    line-height: 1;
    position: relative;

    &::before {
        content: "${({ feedback }) => (feedback === "positive" ? "+" : "-")}";
        position: absolute;
        top: 44%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

export const ReviewContent = styled.div`
    flex: 1;
    font-size: 14px;
    margin-left: 20px;
    text-align: left;
`;