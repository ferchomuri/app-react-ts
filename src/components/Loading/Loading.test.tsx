import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("Render Loading component", () => {
  it("renders without crashing", () => {
    render(<Loading loading={false} />);
    const loading = screen.queryByText("Cargando la informacion");
    expect(loading).not.toBeInTheDocument();
  });

  it("renders loading message", () => {
    render(<Loading loading={true} />);
    const loading = screen.getByText("Cargando la informacion");
    expect(loading).toBeInTheDocument();
  });
});
