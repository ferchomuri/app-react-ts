import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal Component", () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    const modalRoot = screen.queryByTestId("modal-root");
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  it("not show when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={onCloseMock}>
        Test Content
      </Modal>
    );
    expect(screen.queryByText("Test Content")).toBeNull();
  });

  it("show when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        Test Content
      </Modal>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("calls onClose in close button", () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        Test Content
      </Modal>
    );
    fireEvent.click(screen.getByText("×"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("show children", () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>Child Content</div>
      </Modal>
    );
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });
});
