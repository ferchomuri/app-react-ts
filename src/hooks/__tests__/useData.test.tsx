import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { getProducts } from "../../middlewares/productBridge";
import useData from "../useData";

jest.mock("../../middlewares/productBridge", () => ({
  getProducts: jest.fn(),
}));

const mockProducts = [
  {
    id: 1,
    name: "Product 1",
    date_release: "2022-01-01",
    date_revision: "2023-01-01",
  },
  {
    id: 2,
    name: "Product 2",
    date_release: "2022-02-01",
    date_revision: "2023-02-01",
  },
];

const TestComponent: React.FC = () => {
  const [data, isLoading, reloadData] = useData();

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item: any) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
      <button onClick={reloadData}>Reload</button>
    </div>
  );
};

describe("useData hook", () => {
  beforeEach(() => {
    (getProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display data and handle reload", async () => {
    render(<TestComponent />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByText(/loading/i)).toBeNull();
      },
      { timeout: 3000 }
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/reload/i));
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByText(/loading/i)).toBeNull();
      },
      { timeout: 3000 }
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });
});
