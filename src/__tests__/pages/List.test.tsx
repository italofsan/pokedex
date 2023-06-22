import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";

import { List } from "../../pages/List";

// const mockHistoryPush = jest.fn();
// jest.mock("react-router", () => ({
//   ...jest.requireActual("react-router"),
//   useHistory: () => ({
//     push: mockHistoryPush,
//   }),
// }));

const renderComponent = () => {
  render(<List />);
};

describe("Pokemon List", () => {
  it("should render correctly", () => {
    renderComponent();
  });
});
