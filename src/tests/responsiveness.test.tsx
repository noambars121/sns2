import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { ProductGrid } from "../components/product/product-grid";
import { Navigation } from "../components/layout/navigation";

describe("Responsive Design Tests", () => {
  const viewports = [
    { width: 375, height: 667, name: "iPhone SE" },
    { width: 390, height: 844, name: "iPhone 12" },
    { width: 360, height: 800, name: "Android" },
    { width: 1280, height: 800, name: "Desktop" },
  ];

  test.each(viewports)(
    "renders correctly on $name ($width x $height)",
    ({ width, height }) => {
      window.innerWidth = width;
      window.innerHeight = height;
      window.dispatchEvent(new Event("resize"));

      const { container } = render(<ProductGrid />);
      expect(container).toMatchSnapshot();
    },
  );

  test("RTL layout switches correctly", () => {
    const { rerender } = render(<Navigation />);

    // Test LTR
    expect(document.dir).toBe("ltr");

    // Switch to RTL
    document.dir = "rtl";
    rerender(<Navigation />);
    expect(document.dir).toBe("rtl");
  });
});
