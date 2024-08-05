import { fireEvent, render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  existProduct,
  saveProduct,
} from "../../../../middlewares/productBridge";
import { formatDatePut } from "../../../../utils/dateUtils";
import ProductAdd from "../../ProductAdd/ProductAdd";

jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../../../middlewares/productBridge", () => ({
  existProduct: jest.fn(),
  saveProduct: jest.fn(),
}));

jest.mock("../../../../utils/dateUtils.ts", () => ({
  formatDatePut: jest.fn(),
}));

describe("ProductAdd", () => {
  beforeEach(() => {
    (useForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn(),
      formState: { errors: {} },
      setError: jest.fn(),
      clearErrors: jest.fn(),
      setValue: jest.fn(),
      reset: jest.fn(),
    });

    (useNavigate as jest.Mock).mockReturnValue(jest.fn());

    (existProduct as jest.Mock).mockResolvedValue(false);

    (formatDatePut as jest.Mock).mockImplementation((date: string) => date);
  });

  it("renders form with inputs", () => {
    render(<ProductAdd />);

    expect(screen.getByLabelText("ID")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Descripción")).toBeInTheDocument();
    expect(screen.getByLabelText("Logo")).toBeInTheDocument();
    expect(screen.getByLabelText("Fecha de liberación")).toBeInTheDocument();
    expect(screen.getByLabelText("Fecha de revisión")).toBeInTheDocument();
  });

  it("submits form successfully", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    const mockSaveProduct = jest.fn();
    (saveProduct as jest.Mock).mockResolvedValue(undefined);
    (saveProduct as jest.Mock).mockImplementation(mockSaveProduct);

    const mockReset = jest.fn();
    (useForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: (callback: any) => () => callback({}),
      formState: { errors: {} },
      setError: jest.fn(),
      clearErrors: jest.fn(),
      setValue: jest.fn(),
      reset: mockReset,
    });

    render(<ProductAdd />);

    fireEvent.click(screen.getByText("Guardar"));

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(mockSaveProduct).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockReset).toHaveBeenCalled();
  });

  // it("displays error message when ID already exists", async () => {
  //   const mockSetError = jest.fn();
  //   (useForm as jest.Mock).mockReturnValue({
  //     register: jest.fn(),
  //     handleSubmit: (callback: any) => callback({ id: "existingId" }),
  //     formState: { errors: {} },
  //     setError: mockSetError,
  //     clearErrors: jest.fn(),
  //     setValue: jest.fn(),
  //     reset: jest.fn(),
  //   });

  //   (existProduct as jest.Mock).mockResolvedValue(true);

  //   render(<ProductAdd />);

  //   fireEvent.click(screen.getByText("Guardar"));

  //   expect(mockSetError).toHaveBeenCalledWith("id", {
  //     type: "custom",
  //     message: "Este ID ya existe",
  //   });
  // });
});
