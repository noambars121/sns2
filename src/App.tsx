import { Suspense, lazy } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Navigation } from "./components/layout/navigation";
import { LoadingSpinner } from "./components/ui/loading-spinner";
import { Button } from "./components/ui/button";
import { ThemeToggle } from "./components/layout/theme-toggle";
import { SkipLink } from "./components/ui/skip-link";
import { useLoading } from "./lib/providers";

// Import tempo routes
import tempoRoutes from "./tempo-routes";

// Lazy load components
const Home = lazy(() => import("./components/home"));
const CheckoutPage = lazy(() =>
  import("./components/checkout/checkout-page").then((m) => ({
    default: m.CheckoutPage,
  })),
);
const CartPage = lazy(() =>
  import("./components/cart/cart-page").then((m) => ({
    default: m.CartPage,
  })),
);
const WishlistPage = lazy(() =>
  import("./components/wishlist/wishlist-page").then((m) => ({
    default: m.WishlistPage,
  })),
);
const AboutPage = lazy(() =>
  import("./components/about/about-page").then((m) => ({
    default: m.AboutPage,
  })),
);
const ContactPage = lazy(() =>
  import("./components/contact/contact-page").then((m) => ({
    default: m.ContactPage,
  })),
);
const FAQPage = lazy(() =>
  import("./components/faq/faq-page").then((m) => ({
    default: m.FAQPage,
  })),
);

function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-center"
      role="alert"
      aria-live="polite"
    >
      <h1 className="mb-4 text-3xl font-bold text-white">
        404 - Page Not Found
      </h1>
      <p className="mb-6 text-gray-400">
        The page you're looking for doesn't exist.
      </p>
      <Button
        onClick={() => (window.location.href = "/")}
        className="rounded-full bg-[#9FE65C] text-black hover:bg-[#9FE65C]/90"
      >
        Go Home
      </Button>
    </div>
  );
}

function App() {
  const { isLoading } = useLoading();

  // Use tempo routes if enabled
  const tempoRouting =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(tempoRoutes) : null;

  return (
    <ErrorBoundary>
      <div
        dir="ltr"
        className="min-h-screen"
        role="application"
        aria-live="polite"
        aria-busy={isLoading}
        aria-atomic="true"
      >
        <SkipLink />
        <ThemeToggle />
        <Suspense
          fallback={
            <div
              role="status"
              aria-live="polite"
              className="flex min-h-screen items-center justify-center"
            >
              <LoadingSpinner />
            </div>
          }
        >
          <main id="main-content" className="min-h-screen">
            {tempoRouting}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              {import.meta.env.VITE_TEMPO === "true" && (
                <Route path="/tempobook/*" />
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Navigation />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
