import { fireEvent, render, screen } from "@testing-library/react";
import Select from "./Select";

describe("Select", () => {
  it("should render a select element", () => {
    const options = [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
    ];
    const onChange = jest.fn();
    render(<Select options={options} onChange={onChange} />);
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
  });

  it("should render options", () => {
    const options = [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
    ];
    const onChange = jest.fn();
    render(<Select options={options} onChange={onChange} />);
    const optionElements = screen.getAllByRole("option");
    expect(optionElements).toHaveLength(2);
  });

  it("should call onChange when an option is selected", () => {
    const options = [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
    ];
    const onChange = jest.fn();
    render(<Select options={options} onChange={onChange} />);
    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "1" } });
    expect(onChange).toHaveBeenCalledWith("1");
  });
});
