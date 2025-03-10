import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useHotels } from './hooks/useHotels';
import HotelsContainer from './containers/HotelsContainer';
import HotelsList from './components/HotelsList';

jest.mock("./hooks/useHotels");

describe("HotelsContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks between tests
  });

  it("renders loading state and loads hotels", async () => {
    useHotels.mockReturnValue({
      fetchHotels: jest.fn(),
      hotelsLoading: true,
      hotelsError: null,
      hotels: [],
    });

    render(<HotelsContainer />);
    expect(screen.getByText("Loading hotels...")).toBeInTheDocument();
  });

  it("renders error message when hotels fail to load", () => {
    useHotels.mockReturnValue({
      fetchHotels: jest.fn(),
      hotelsLoading: false,
      hotelsError: "Error loading hotels",
      hotels: [],
    });

    render(<HotelsContainer />);
    expect(screen.getByText("Error loading hotels.")).toBeInTheDocument();
  });

  it("fetches hotels when Load Hotels button is clicked", () => {
    const fetchHotels = jest.fn();
    useHotels.mockReturnValue({
      fetchHotels,
      hotelsLoading: false,
      hotelsError: null,
      hotels: [],
    });

    render(<HotelsContainer />);
    fireEvent.click(screen.getByText("Load Hotels"));
    expect(fetchHotels).toHaveBeenCalled();
  });

  it("renders hotels after successful fetch", async () => {
    const mockHotels = [
      {
        sys: { id: "1" },
        name: "Test Hotel",
        city: "Berlin",
        country: "Germany",
        price: { value: 100 },
        startDate: "2024-06-01",
        endDate: "2024-06-10",
        imagesCollection: { items: [{ url: "image.jpg", title: "Hotel Image" }] },
      },
    ];

    useHotels.mockReturnValue({
      fetchHotels: jest.fn(),
      hotelsLoading: false,
      hotelsError: null,
      hotels: mockHotels,
    });

    render(<HotelsContainer />);
    await waitFor(() => {
      expect(screen.getByText("Test Hotel")).toBeInTheDocument();
      expect(screen.getByText("Berlin, Germany")).toBeInTheDocument();
      expect(screen.getByText("€100")).toBeInTheDocument();
      expect(screen.getByText("1.6.2024 - 10.6.2024")).toBeInTheDocument();
    });
  });
});

describe("HotelsList", () => {
  it("renders hotels with name, location, price, and formatted dates", () => {
    const mockHotels = [
      {
        sys: { id: "1" },
        name: "Test Hotel",
        city: "Berlin",
        country: "Germany",
        price: { value: 100 },
        startDate: "2024-06-01",
        endDate: "2024-06-10",
        imagesCollection: { items: [{ url: "image.jpg", title: "Hotel Image" }] },
      },
    ];

    render(
      <HotelsList
        hotels={mockHotels}
        hotelReviews={{}}
        reviewsLoading={false}
        expandedHotels={[]}
        getHotelReviews={() => {}}
      />
    );

    expect(screen.getByText("Test Hotel")).toBeInTheDocument();
    expect(screen.getByText("Berlin, Germany")).toBeInTheDocument();
    expect(screen.getByText("€100")).toBeInTheDocument();
    expect(screen.getByText("1.6.2024 - 10.6.2024")).toBeInTheDocument();
  });

  it("toggles review section when button is clicked", () => {
    const getHotelReviews = jest.fn();
    const mockHotels = [
      {
        sys: { id: "1" },
        name: "Test Hotel",
        city: "Berlin",
        country: "Germany",
        price: { value: 100 },
        imagesCollection: { items: [{ url: "image.jpg", title: "Hotel Image" }] },
      },
    ];

    render(
      <HotelsList
        hotels={mockHotels}
        hotelReviews={{}}
        reviewsLoading={false}
        expandedHotels={[]}
        getHotelReviews={getHotelReviews}
      />
    );

    const button = screen.getByText("Show Reviews");
    fireEvent.click(button);
    expect(getHotelReviews).toHaveBeenCalledWith("1");
  });

  it("shows loading state when reviews are being fetched", () => {
    const mockHotels = [
      {
        sys: { id: "1" },
        name: "Test Hotel",
        city: "Berlin",
        country: "Germany",
        price: { value: 100 },
        imagesCollection: { items: [{ url: "image.jpg", title: "Hotel Image" }] },
      },
    ];

    render(
      <HotelsList
        hotels={mockHotels}
        hotelReviews={{}}
        reviewsLoading={true}
        expandedHotels={["1"]}
        getHotelReviews={() => {}}
      />
    );

    expect(screen.getByText("Loading reviews...")).toBeInTheDocument();
  });

  it("shows no reviews message when there are no reviews", () => {
    const mockHotels = [
      {
        sys: { id: "1" },
        name: "Test Hotel",
        city: "Berlin",
        country: "Germany",
        price: { value: 100 },
        imagesCollection: { items: [{ url: "image.jpg", title: "Hotel Image" }] },
      },
    ];

    render(
      <HotelsList
        hotels={mockHotels}
        hotelReviews={{ "1": [] }}
        reviewsLoading={false}
        expandedHotels={["1"]}
        getHotelReviews={() => {}}
      />
    );

    expect(screen.getByText("No reviews available.")).toBeInTheDocument();
  });
});