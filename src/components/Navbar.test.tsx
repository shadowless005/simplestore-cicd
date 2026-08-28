import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";

import Navbar from "./Navbar";
import cartReducer from "../redux/cartSlice";

describe("Navbar", () => {
  test("shows the total number of cart items", () => {
    const testStore = configureStore({
      reducer: {
        cart: cartReducer,
      },
      preloadedState: {
        cart: {
          items: [
            {
              id: "1",
              title: "Test Product",
              price: 25,
              image: "test.jpg",
              quantity: 2,
            },
          ],
        },
      },
    });

    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <Navbar user={null} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Cart")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
