import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import React from "react";
import { act } from "react-dom/test-utils";
import { Cards } from ".";
import { TodoStoreContext } from "../../context";
import { mockData } from "../../mockData";

const props = {
  cardList: mockData,
  removeItem: jest.fn(),
  changeStatusOfItem: jest.fn(),
};

const mockContext = {
  cardList: mockData,
  removeItem: jest.fn(),
  addItem: jest.fn(),
  changeStatusOfItem: jest.fn(),
};

const renderContainer = () =>
  render(
    <TodoStoreContext.Provider value={mockContext}>
      <Cards {...props} />
    </TodoStoreContext.Provider>
  );

describe("<Cards />", () => {
  test("component should be render", () => {
    const { container } = renderContainer();

    expect(container).toMatchSnapshot();
  });

  test("card should be defined on the screen", () => {
    /*   renderContainer();

    const getCard = screen.getByTestId("card-1-data-test-id");

    expect(getCard).toBeDefined(); */
  });

  test("button should be defined on the screen", () => {
    /*   renderContainer();

    const getButton = screen.getByTestId("delete-1-data-test-id");

    expect(getButton).toBeDefined(); */
  });

  test("typography should be defined on the screen", () => {
    /*  renderContainer();

    const getTypography = screen.getByTestId("typography-1-data-test-id");

    expect(getTypography).toBeDefined();

    const getText = screen.getByText("text 1");

    expect(getText).toBeDefined(); */
  });

  test("when checkbox click, text should be line-through", async () => {
    renderContainer();
    const getTypography = screen.getByTestId("typography-1-data-test-id");
    expect(getTypography).toBeDefined();

    expect(getTypography).not.toHaveStyle("text-decoration: line-through;");

    const getButton = screen.getByTestId("checkbox-1-data-test-id");

    expect(getButton).toBeDefined();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      fireEvent.click(getButton);
      expect(getTypography).toHaveStyle("text-decoration: none;");
    });
  });

  test("when delete button click, text shouldn't be defined on screen", async () => {
    const { getByTestId } = renderContainer();
    const getTypography = screen.getByTestId("typography-1-data-test-id");
    expect(getTypography).toBeDefined();

    const deleteButton = screen.getByTestId("delete-1-data-test-id");

    expect(deleteButton).toBeDefined();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(deleteButton);
      const text = await screen.findByTestId("typography-1-data-test-id");
      expect(text).not.toBeDefined();
    });
  });
});
