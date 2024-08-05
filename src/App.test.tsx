import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App Component", () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  };

  it("renders Navbar correctly", () => {
    setup();
    expect(screen.getByText("BANCO")).toBeInTheDocument();
  });

  it("renders Product correctly", async () => {
    setup();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(screen.getByTestId("product_test")).toBeInTheDocument();
  });
});
