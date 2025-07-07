import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero/Hero";
import { ShopDescription } from "./components/ShopDescription";
import { CollectionSection } from "./components/Collections/CollectionSection";
import { Footer } from "./components/Footer";
import { collections } from "./data/collections";
import { CartProvider } from "./context/CartContext";
import { CustomDesignsBar } from "./components/CustomDesignsBar";

export default function App() {
  React.useEffect(() => {
    // Handle keyboard shortcuts
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "t") {
        document
          .getElementById("traditional")
          ?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "f") {
        document
          .getElementById("festive")
          ?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "m") {
        document
          .getElementById("menswear")
          ?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "a") {
        document
          .getElementById("accessories")
          ?.scrollIntoView({ behavior: "smooth" });
      }

      // Prevent F12 key
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }

      // Prevent Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (
        e.ctrlKey &&
        e.shiftKey &&
        (e.key === "I" || e.key === "J" || e.key === "C")
      ) {
        e.preventDefault();
        return false;
      }

      // Prevent Ctrl+U (view source)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        return false;
      }
    };

    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable DevTools through console
    const disableDevTools = () => {
      const handler = setInterval(() => {
        const before = new Date().getTime();
        debugger;
        const after = new Date().getTime();
        if (after - before > 100) {
          document.body.innerHTML = "";
          window.location.reload();
        }
      }, 1000);

      return () => clearInterval(handler);
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("contextmenu", handleContextMenu);
    const cleanup = disableDevTools();

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("contextmenu", handleContextMenu);
      cleanup();
    };
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-emerald-50">
        <Navbar />
        <Hero />
        <ShopDescription />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {Object.entries(collections).map(([key, collection]) => (
            <CollectionSection
              key={key}
              id={key}
              title={collection.title}
              products={collection.products}
            />
          ))}
        </main>
        <CustomDesignsBar />
        <Footer />
      </div>
    </CartProvider>
  );
}
