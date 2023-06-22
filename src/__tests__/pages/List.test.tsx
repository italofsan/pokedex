import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";

import { ListPokemon } from "../../pages/List";

// const mockHistoryPush = jest.fn();
// jest.mock("react-router", () => ({
//   ...jest.requireActual("react-router"),
//   useHistory: () => ({
//     push: mockHistoryPush,
//   }),
// }));

const renderComponent = () => {
  render(<ListPokemon />);
};

describe("Pokemon List", () => {
  it("should render correctly", () => {
    renderComponent();
  });
});
