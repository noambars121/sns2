import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { ProductCard } from "../components/product/product-card";
import { ContactPage } from "../components/contact/contact-page";
import { ProductDetail } from "../components/product/product-detail";
import { Navigation } from "../components/layout/navigation";

expect.extend(toHaveNoViolations);

describe("Accessibility Tests", () => {
  test("ProductCard meets WCAG standards", async () => {
    const { container } = render(
      <ProductCard
        id={1}
        name="Test Product"
        price="$100"
        collection="Test Collection"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test("Navigation is keyboard accessible", () => {
    render(<Navigation />);
    const navItems = screen.getAllByRole("button");
    navItems.forEach((item) => {
      expect(item).toHaveAttribute("tabindex");
    });
  });

  test("Images have alt text", () => {
    render(
      <ProductDetail
        id={1}
        name="Test Product"
        price="$100"
        collection="Test Collection"
      />,
    );
    const images = screen.getAllByRole("img");
    images.forEach((img) => {
      expect(img).toHaveAttribute("alt");
    });
  });

  test("Contact form meets accessibility standards", async () => {
    const { container } = render(<ContactPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();

    // Check form labels
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => expect(input).toHaveAttribute("aria-label"));
  });
});
