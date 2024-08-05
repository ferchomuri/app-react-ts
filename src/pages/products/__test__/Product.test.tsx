import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../../middlewares/productBridge";
import { useData } from "../../../hooks";
import Product from "../Product";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../../middlewares/productBridge", () => ({
  deleteProduct: jest.fn(),
}));

jest.mock("../../../hooks", () => ({
  useData: jest.fn(),
}));

jest.mock("../../../components", () => ({
  Button: ({ text, onClick }: any) => <button onClick={onClick}>{text}</button>,
  Container: ({ children }: any) => <div>{children}</div>,
  Input: ({ placeholder, value, onChange }: any) => (
    <input placeholder={placeholder} value={value} onChange={onChange} />
  ),
  Modal: ({ isOpen, onClose, children }: any) =>
    isOpen ? (
      <div>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
  Table: ({ data, columns, actions }: any) => (
    <table>
      <thead>
        <tr>
          {columns.map((col: any) => (
            <th key={col.name}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item: any, index: number) => (
          <tr key={index}>
            {columns.map((col: any) => (
              <td key={col.name}>{item[col.name]}</td>
            ))}
            <td>
              {actions.map((action: any) => (
                <button key={action.action} onClick={() => action.do(item)}>
                  {action.action}
                </button>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

describe("Product", () => {
  const mockNavigate = jest.fn();
  const mockReloadData = jest.fn();
  const mockDeleteProduct = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useData as jest.Mock).mockReturnValue([
      [
        {
          id: "1",
          logo: "logo1.png",
          name: "Product 1",
          description: "Description 1",
          date_release: "2023-01-01",
          date_revision: "2023-01-02",
        },
      ],
      false,
      mockReloadData,
    ]);
    (deleteProduct as jest.Mock).mockImplementation(mockDeleteProduct);
  });

  it("renders search input and add button", () => {
    render(<Product />);

    expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
    expect(screen.getByText("Agregar")).toBeInTheDocument();
  });

  it("filters data based on search input", () => {
    render(<Product />);

    fireEvent.change(screen.getByPlaceholderText("Buscar..."), {
      target: { value: "Product 1" },
    });

    expect(screen.getByText("Product 1")).toBeInTheDocument();
  });

  it("opens modal on delete action and confirms deletion", async () => {
    render(<Product />);

    fireEvent.click(screen.getByText("Eliminar"));

    expect(screen.getByText("Confirmar eliminación")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Confirmar"));

    await waitFor(() => {
      expect(mockDeleteProduct).toHaveBeenCalledWith("1");
    });
    expect(mockReloadData).toHaveBeenCalled();
  });
});
