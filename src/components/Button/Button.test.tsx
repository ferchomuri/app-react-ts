import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders the button with the provided text", () => {
    const buttonText = "Click me";
    render(<Button text={buttonText} />);
    const buttonElement = screen.getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the onClick function when the button is clicked", () => {
    const onClickMock = jest.fn();
    render(<Button text='Click me' onClick={onClickMock} />);
    const buttonElement = screen.getByText("Click me");
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });

  it("applies the specified size and color class to the button", () => {
    render(
      <Button text='Click me' size='large-button' color='secondary-button' />
    );
    const buttonElement = screen.getByTestId(
      "large-button secondary-button button"
    );
    expect(buttonElement).toBeInTheDocument();
  });

  it("has a default values of 'button'", () => {
    render(<Button text='Click me' />);
    const buttonElement = screen.getByTestId(
      "small-button primary-button button"
    );
    expect(buttonElement).toBeInTheDocument();
  });
});
