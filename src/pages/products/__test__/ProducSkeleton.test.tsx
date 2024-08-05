import { render, screen } from "@testing-library/react";
import ProductSkeleton from "../ProductSkeleton";

describe("ProductSkeleton", () => {
  it("renders the skeleton components", () => {
    render(<ProductSkeleton />);

    expect(screen.getByTestId("skeleton-1")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-2")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-3")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-4")).toBeInTheDocument();
  });
});
