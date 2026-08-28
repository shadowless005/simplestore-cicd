import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import Navbar from "./Navbar";
import cartReducer, { addToCart } from "../redux/cartSlice";

describe("Cart Integration", () => {
  test("updates the cart badge after adding a product", () => {
    const store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });

    store.dispatch(
      addToCart({
        id: "1",
        title: "Test Product",
        price: 25,
        image: "test.jpg",
        quantity: 1,
      }),
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar user={null} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
