import { render, screen } from "@testing-library/react";
import Image from "./Image";

describe("Image component", () => {
  it("renders an image with the correct src and alt attributes", () => {
    const src = "path/to/image.jpg";
    const alt = "Image description";
    render(<Image src={src} alt={alt} />);
    const imageElement = screen.getByAltText(alt);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", src);
  });

  it("applies custom styles to the image", () => {
    const src = "path/to/image.jpg";
    const alt = "Image description";
    const customStyle = { width: "100%", height: "auto" };
    render(<Image src={src} alt={alt} style={customStyle} />);
    const imageElement = screen.getByAltText(alt);
    expect(imageElement).toHaveStyle(customStyle);
  });
});
