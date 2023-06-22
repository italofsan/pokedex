import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Details } from "../../pages/Details";
import { BrowserRouter } from "react-router-dom";

const renderComponent = () => {
  render(
    <BrowserRouter>
      <Details />
    </BrowserRouter>
  );
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "6",
  }),
  useRouteMatch: () => ({ url: "pokemons/6/details" }),
}));

describe("Details page", () => {
  it("should render correctly", async () => {
    renderComponent();

    const text = await screen.findByText("Types");

    expect(text).toBeInTheDocument();
  });
});
