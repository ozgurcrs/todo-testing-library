import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { Cards } from ".";
import { mockData } from "../../mockData";

const mockRemoveItem = jest.fn();
const mockChangeStatusOfItem = jest.fn();

const renderContainer = (props = {}) =>
  render(
    <Cards
      cardList={mockData}
      removeItem={mockRemoveItem}
      changeStatusOfItem={mockChangeStatusOfItem}
      {...props}
    />
  );

describe("<Cards />", () => {
  it("component should be render", () => {
    const { container } = renderContainer();

    expect(container).toBeInTheDocument();
  });

  it("should render cards correctly", () => {
    renderContainer();

    mockData.forEach((mData) => {
      const getCard = screen.getByTestId(`card-${mData.id}-data-test-id`);

      expect(getCard).toBeDefined();
    });
  });

  it("should render delete buttons correctly", () => {
    renderContainer();

    expect(screen.getAllByRole("button", { name: /Delete/i }).length).toEqual(
      mockData.length
    );
  });

  it("should render cards text's correctly", () => {
    renderContainer();

    mockData.forEach((mData) => {
      expect(screen.getByText(mData.text)).toBeTruthy();
    });
  });

  it("when checkbox click, text should be line-through", async () => {
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

  it("should call removeItem function correctly when delete button clicked", async () => {
    renderContainer();

    mockData.forEach((mData) => {
      const itemId = mData.id;

      const deleteButton = screen.getByTestId(`delete-${itemId}-data-test-id`);

      expect(deleteButton).toBeDefined();

      userEvent.click(deleteButton);

      expect(mockRemoveItem).toBeCalled();
      expect(mockRemoveItem).toBeCalledWith(itemId);
    });
  });
});
