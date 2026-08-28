import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  test("renders the SimpleStore brand and shopping message", () => {
    render(<Footer />);

    expect(screen.getByText("Simple", { exact: true })).toBeInTheDocument();
    expect(screen.getByText("Store", { exact: true })).toBeInTheDocument();

    expect(
      screen.getByText(
        "A simple, modern shopping experience built for convenience.",
      ),
    ).toBeInTheDocument();
  });
});
