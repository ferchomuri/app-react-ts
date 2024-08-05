import { render, screen } from "@testing-library/react";
import ProductAddSkeleton from "../../ProductAdd/ProductAddSkeleton";

describe("ProductAddSkeleton", () => {
  it("renders the skeleton components", () => {
    render(<ProductAddSkeleton />);

    expect(screen.getByTestId("skeleton-1")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-2")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-3")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-4")).toBeInTheDocument();
  });
});
