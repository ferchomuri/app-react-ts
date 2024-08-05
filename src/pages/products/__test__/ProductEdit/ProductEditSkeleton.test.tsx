import { render, screen } from "@testing-library/react";
import ProductEditSkeleton from "../../ProductEdit/ProductEditSkeleton";

describe("ProductEditSkeleton", () => {
  it("renders the skeleton components", () => {
    render(<ProductEditSkeleton />);

    expect(screen.getByTestId("skeleton-1")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-2")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-3")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-4")).toBeInTheDocument();
  });
});
