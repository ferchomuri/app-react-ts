import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders the logo and a back button", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    );
    const nameLogo = screen.getByText("BANCO");
    expect(nameLogo).toBeInTheDocument();
  });

  it("does not render back button when on home page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    );
    const backButton = screen.queryByText("Regresar");
    expect(backButton).not.toBeInTheDocument();
  });

  it("renders back button when not on home page", () => {
    render(
      <MemoryRouter initialEntries={["/test"]}>
        <Navbar />
      </MemoryRouter>
    );
    const backButton = screen.getByText("Regresar");
    expect(backButton).toBeInTheDocument();
  });
});
