import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import ProductEdit from "../../ProductEdit/ProductEdit";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { updateProduct } from "../../../../middlewares/productBridge";

// Mocks
jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock("../../../../middlewares/productBridge", () => ({
  updateProduct: jest.fn(),
}));

describe("ProductEdit", () => {
  beforeEach(() => {
    (useForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn((callback) => (e: any) => callback(e)),
      formState: { errors: {} },
      reset: jest.fn(),
      setError: jest.fn(),
      clearErrors: jest.fn(),
      setValue: jest.fn(),
    });

    (useNavigate as jest.Mock).mockReturnValue(jest.fn());

    (useLocation as jest.Mock).mockReturnValue({
      state: {
        id: "1",
        name: "Test Product",
        description: "Test Description",
        logo: "test-logo.png",
        date_release: "2023-01-01",
        date_revision: "2023-01-01",
      },
    });

    (updateProduct as jest.Mock).mockResolvedValue(undefined);
  });

  it("renders form with inputs", () => {
    render(<ProductEdit />);

    expect(screen.getByLabelText("ID")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Descripción")).toBeInTheDocument();
    expect(screen.getByLabelText("Logo")).toBeInTheDocument();
    expect(screen.getByLabelText("Fecha de liberación")).toBeInTheDocument();
    expect(screen.getByLabelText("Fecha de revisión")).toBeInTheDocument();
  });

  it("submits form and navigates", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<ProductEdit />);

    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(updateProduct).toHaveBeenCalled();
    });
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("handles input changes", () => {
    render(<ProductEdit />);

    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Updated Product" },
    });
    fireEvent.change(screen.getByLabelText("Descripción"), {
      target: { value: "Updated Description" },
    });

    expect(screen.getByLabelText("Nombre")).toHaveValue("Updated Product");
    expect(screen.getByLabelText("Descripción")).toHaveValue(
      "Updated Description"
    );
  });

  it("resets form when Reset button is clicked", () => {
    const mockReset = jest.fn();
    (useForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn(),
      formState: { errors: {} },
      reset: mockReset,
    });

    render(<ProductEdit />);

    fireEvent.click(screen.getByText("Reiniciar"));

    expect(mockReset).toHaveBeenCalledWith({
      name: "",
      description: "",
      logo: "",
      date_release: "",
      date_revision: "",
    });
  });
});
