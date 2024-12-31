import { describe, test, expect, beforeEach } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { ProductCard } from "../components/product/product-card";
import { ProductDetail } from "../components/product/product-detail";
import { CheckoutPage } from "../components/checkout/checkout-page";
import { BrowserRouter } from "react-router-dom";

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe("E-commerce Functionality Tests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("wishlist toggle works correctly", async () => {
    renderWithRouter(
      <ProductCard
        id={1}
        name="Test Product"
        price="$100"
        collection="Test Collection"
      />,
    );

    const wishlistButton = screen.getByLabelText(/add to wishlist/i);
    fireEvent.click(wishlistButton);

    await waitFor(() => {
      const storage = JSON.parse(
        localStorage.getItem("wishlist-storage") || "{}",
      );
      expect(storage.state.items).toContainEqual(
        expect.objectContaining({ id: 1 }),
      );
    });

    // Test removal
    fireEvent.click(wishlistButton);
    await waitFor(() => {
      const storage = JSON.parse(
        localStorage.getItem("wishlist-storage") || "{}",
      );
      expect(storage.state.items).not.toContainEqual(
        expect.objectContaining({ id: 1 }),
      );
    });
  });

  test("product selection workflow", async () => {
    renderWithRouter(<ProductDetail id={1} />);

    // Select size
    const sizeButton = screen.getByText("M");
    fireEvent.click(sizeButton);
    expect(sizeButton).toHaveClass("bg-[#9FE65C]");

    // Select color
    const colorButton = screen.getByText("Black");
    fireEvent.click(colorButton);
    expect(colorButton).toHaveClass("bg-[#9FE65C]");

    // Add to cart
    const addToCartButton = screen.getByText(/add to cart/i);
    expect(addToCartButton).not.toBeDisabled();
    fireEvent.click(addToCartButton);
  });

  test("checkout form validation", async () => {
    renderWithRouter(<CheckoutPage />);

    // Try to submit without filling required fields
    const submitButton = screen.getByText(/place order/i);
    fireEvent.click(submitButton);

    // Check for validation messages
    await waitFor(() => {
      expect(screen.getAllByText(/required/i)).toHaveLength(5);
    });

    // Fill in valid data
    const inputs = [
      { label: /first name/i, value: "John" },
      { label: /last name/i, value: "Doe" },
      { label: /address/i, value: "123 Main St" },
      { label: /city/i, value: "New York" },
      { label: /zip/i, value: "10001" },
    ];

    for (const { label, value } of inputs) {
      const input = screen.getByLabelText(label);
      fireEvent.change(input, { target: { value } });
    }

    // Submit form
    fireEvent.click(submitButton);

    // Check processing state
    await waitFor(() => {
      expect(screen.getByText(/processing/i)).toBeInTheDocument();
    });
  });
});
