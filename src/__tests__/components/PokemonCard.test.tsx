import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";

import { Layout } from "../../components/Layout";
import { PokemonCard } from "../../components/PokemonCard";

const mockHistoryPush = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const fakePokemon = {
  id: "6",
  name: "charizard",
};

const renderComponent = () => {
  render(<PokemonCard pokemonData={fakePokemon} />);
};

describe("PokemonCard Component", () => {
  it("should render correctly", () => {
    renderComponent();

    expect(screen.getByText("More Information")).toBeInTheDocument();
  });

  it("should call navigate when the card is clicked", () => {
    renderComponent();

    const pokemonCard = screen.getByRole("pokemonCard");
    fireEvent.click(pokemonCard);

    expect(mockHistoryPush).toHaveBeenCalledWith("/pokemons/6/details");
  });

  it("should call navigate when the more information button is clicked", () => {
    renderComponent();

    const btnMoreInfo = screen.getByRole("btnMoreInfo");
    fireEvent.click(btnMoreInfo);

    expect(mockHistoryPush).toHaveBeenCalledWith("/pokemons/6/details");
  });
});
