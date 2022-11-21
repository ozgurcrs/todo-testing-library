import * as React from "react";
import { mockCardListData } from "../../fakeData";
import ApiBase from "../../api";
import MainContainer from "./index";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import TodoStoreProvider from "../../providers";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

jest.mock("../../api");

const mockCardListItem1 = {
  id: "mock-item-1",
  isActive: false,
  avatar: "mock-item-1-avatar",
  text: "mock-item-1-text",
};

const mockFakeFetchCardList = jest
  .fn()
  .mockImplementation(() => Promise.resolve(mockCardListData));

ApiBase.fakeFetchCardList = mockFakeFetchCardList;

const mockAddItem = jest
  .fn()
  .mockImplementation(() => Promise.resolve(mockCardListItem1));

ApiBase.fakeAddItemApiCall = mockAddItem;

const renderScreen = () => {
  return render(
    <TodoStoreProvider>
      <MainContainer />
    </TodoStoreProvider>
  );
};

describe("<MainContainer/>", () => {
  beforeEach(() => {
    mockFakeFetchCardList.mockImplementation(() =>
      Promise.resolve(mockCardListData)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render root component", () => {
    const { container } = renderScreen();

    expect(container).toBeInTheDocument();
  });

  it("should add item", async () => {
    const mockAddItem = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockCardListItem1));

    ApiBase.fakeAddItemApiCall = mockAddItem;

    renderScreen();

    await waitForElementToBeRemoved(screen.queryByText(/Loading.../));

    expect(screen.getByLabelText(/add item/)).toBeTruthy();

    userEvent.type(
      screen.getByLabelText(/add item/),
      `${"aso todo item"}[Enter]`
    );

    await act(async () => {
      await waitFor(() => expect(mockAddItem).toBeCalled());
    });

    expect(screen.getAllByRole("checkbox").length).toEqual(
      mockCardListData.length + 1
    );

    expect(screen.getByText(mockCardListItem1.text)).toBeTruthy();
  });

  it("should remove item", async () => {
    const mockAddItem = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockCardListItem1));

    ApiBase.fakeAddItemApiCall = mockAddItem;

    renderScreen();

    await waitForElementToBeRemoved(screen.queryByText(/Loading.../));

    expect(screen.getByLabelText(/add item/)).toBeTruthy();

    userEvent.type(
      screen.getByLabelText(/add item/),
      `${"aso todo item"}[Enter]`
    );

    await act(async () => {
      await waitFor(() => expect(mockAddItem).toBeCalled());
    });

    expect(screen.getAllByRole("checkbox").length).toEqual(
      mockCardListData.length + 1
    );

    expect(screen.getByText(mockCardListItem1.text)).toBeTruthy();

    expect(
      screen.getByTestId(`delete-${mockCardListItem1.id}-data-test-id`)
    ).toBeTruthy();

    userEvent.click(
      screen.getByTestId(`delete-${mockCardListItem1.id}-data-test-id`)
    );

    expect(screen.getAllByRole("checkbox").length).toEqual(
      mockCardListData.length
    );
    expect(screen.queryByText(mockCardListItem1.text)).toBeFalsy();
  });

  it("should change status of item", async () => {
    const mockAddItem = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockCardListItem1));

    const mockChangeStatus = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ ...mockCardListItem1, isActive: true })
      );

    ApiBase.fakeAddItemApiCall = mockAddItem;
    ApiBase.changeStatusOfItem = mockChangeStatus;

    renderScreen();

    await waitForElementToBeRemoved(screen.queryByText(/Loading.../));

    expect(screen.getByLabelText(/add item/)).toBeTruthy();

    userEvent.type(
      screen.getByLabelText(/add item/),
      `${"aso todo item"}[Enter]`
    );

    await act(async () => {
      await waitFor(() => expect(mockAddItem).toBeCalled());
    });

    expect(screen.getAllByRole("checkbox").length).toEqual(
      mockCardListData.length + 1
    );

    expect(screen.getByText(mockCardListItem1.text)).toBeTruthy();

    await act(async () => {
      await userEvent.click(
        screen.getByTestId(`checkbox-${mockCardListItem1.id}-data-test-id`)
      );
    });

    await act(async () => {
      await waitFor(() => expect(mockChangeStatus).toBeCalled());
    });

    expect(
      screen.getByTestId(`checkbox-${mockCardListItem1.id}-data-test-id`)
    ).toBeChecked();
  });
});
