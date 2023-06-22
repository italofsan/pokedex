import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import { Login } from "../../pages/Login";

const renderComponent = () => {
  render(<Login />);
};

describe("Login", () => {
  it("should render correctly", () => {
    renderComponent();

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("should call navigate when the login button is clicked", async () => {
    renderComponent();

    const firstNameInput = screen.getByTestId("firstNameInput");
    const lastNameInput = screen.getByTestId("lastNameInput");

    act(() => {
      fireEvent.change(firstNameInput, { target: { value: "Italo" } });
      fireEvent.change(lastNameInput, { target: { value: "Santos" } });
    });

    await waitFor(() => {
      expect(firstNameInput).toHaveValue("Italo");
    });
    await waitFor(() => {
      expect(lastNameInput).toHaveValue("Santos");
    });

    fireEvent.click(screen.getByRole("btnLogin"));
  });
});
