import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import Cart from "../pages/Cart";
import cartReducer from "../redux/cartSlice";

jest.mock("../firebaseConfig", () => ({
  auth: { currentUser: null },
  db: {},
}));

jest.mock("firebase/auth", () => ({
  signOut: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  addDoc: jest.fn(),
  collection: jest.fn(),
  serverTimestamp: jest.fn(),
}));

describe("Cart Integration", () => {
  test("adding a product updates the real cart, quantities, totals, and storage", async () => {
    const user = userEvent.setup();

    const store = configureStore({
      reducer: {
        cart: cartReducer,
      },
      preloadedState: {
        cart: {
          items: [],
        },
      },
    });

    const client = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <QueryClientProvider client={client}>
            <Navbar user={null} />

            <ProductCard
              product={{
                id: "demo",
                title: "Demo mug",
                price: 25,
                image: "demo.jpg",
                category: "Home",
                description: "A demo mug",
                rating: {
                  rate: 4,
                  count: 2,
                },
              }}
            />

            <Cart />
          </QueryClientProvider>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /add to cart/i,
      }),
    );

    const cart = screen.getByRole("main");

    expect(
      within(cart).getByRole("heading", {
        name: "Demo mug",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /Cart 1/,
      }),
    ).toBeInTheDocument();

    await user.click(
      within(cart).getByRole("button", {
        name: "Increase quantity",
      }),
    );

    expect(
      screen.getByRole("link", {
        name: /Cart 2/,
      }),
    ).toBeInTheDocument();

    expect(within(cart).getAllByText("$50.00")).not.toHaveLength(0);

    expect(
      JSON.parse(sessionStorage.getItem("cart")!)[0].quantity,
    ).toBe(2);

    await user.click(
      within(cart).getByRole("button", {
        name: "Decrease quantity",
      }),
    );

    expect(store.getState().cart.items[0].quantity).toBe(1);

    await user.click(
      within(cart).getByRole("button", {
        name: "Remove",
      }),
    );

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(JSON.parse(sessionStorage.getItem("cart")!)).toEqual([]);

    client.clear();
  });
});
