import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";

import { Layout } from "../../components/Layout";

const mockHistoryPush = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const renderComponent = () => {
  render(
    <BrowserRouter>
      <Layout>
        <div>Layout rendered</div>
      </Layout>
    </BrowserRouter>
  );
};

describe("Layout Component", () => {
  it("should render correctly", () => {
    renderComponent();

    expect(screen.getByText("All Pokemons")).toBeInTheDocument();
  });

  it("should call navigate when clicks the button All Pokemons", () => {
    renderComponent();

    const btnAllPokemons = screen.getByRole("btnAllPokemons");
    fireEvent.click(btnAllPokemons);

    expect(mockHistoryPush).toHaveBeenCalledWith("/");
  });
});
