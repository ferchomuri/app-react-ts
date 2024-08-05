import { render } from "@testing-library/react";
import Text from "./Text";

describe("Text", () => {
  it("should render the component", () => {
    const { container } = render(<Text text='Test' />);
    expect(container).toMatchSnapshot();
  });
});
