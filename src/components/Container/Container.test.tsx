import { render, screen } from "@testing-library/react";
import Container from "./Container";

describe("Container", () => {
  it("renders children", () => {
    render(<Container>Children</Container>);
    const container = screen.getByText("Children");
    expect(container).toBeInTheDocument();
  });
});
