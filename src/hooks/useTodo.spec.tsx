import {
  act,
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import * as React from "react";
import useTodo from "./useTodo";
import TodoStoreProvider from "../providers";
import ApiBase from "../api";

const mockCardListItem1 = {
  id: "mock-item-1",
  text: "mock item 1",
  isActive: false,
  avatar: "https://picsum.photos/300/300",
};

const mockCardListItem2 = {
  id: "mock-item-2",
  text: "mock item 2",
  isActive: false,
  avatar: "https://picsum.photos/300/300",
};

jest.mock("../api");

const mockFakeAddItemApiCall = jest.fn(() =>
  Promise.resolve(mockCardListItem1)
);
const mockFakeFetchCardList = jest.fn(() => Promise.resolve([]));

const MockComponent = () => {
  const { addItem, cardList, loading, removeItem, changeStatusOfItem } =
    useTodo();

  const handleAddNewItem = async () => {
    try {
      await addItem("mock item");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveItem = () => {
    removeItem(mockCardListItem1.id);
  };

  const handleChangeStatusOfItem = async () => {
    try {
      await changeStatusOfItem(mockCardListItem1.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <div>
            card list:
            <div>
              {cardList?.length > 0
                ? cardList.map((item, index) => (
                    <p key={index}>
                      {item?.text}
                      <span>
                        {item?.id}:{`${item.isActive}`}
                      </span>
                    </p>
                  ))
                : null}
            </div>
          </div>

          <div onClick={handleAddNewItem}>add item</div>
          <div onClick={handleRemoveItem}>remove item</div>
          <div onClick={handleChangeStatusOfItem}>change status of item</div>
        </>
      )}
    </>
  );
};

const renderScreen = () => {
  return render(
    <TodoStoreProvider>
      <MockComponent />
    </TodoStoreProvider>
  );
};

describe("useTodo", () => {
  beforeEach(() => {
    ApiBase.fakeAddItemApiCall = mockFakeAddItemApiCall;
    ApiBase.fakeFetchCardList = mockFakeFetchCardList;
  });

  afterEach(() => {
    mockFakeAddItemApiCall.mockClear();
    mockFakeFetchCardList.mockClear();
  });

  it("should render root component without any crashing", async () => {
    const { container } = renderScreen();

    expect(container).toBeInTheDocument();
  });

  it("should render card list after fetch api resolved", async () => {
    renderScreen();

    await waitForElementToBeRemoved(screen.queryByText(/loading.../));

    expect(mockFakeFetchCardList).toBeCalled();
    expect(screen.getByText(/card list/)).toBeTruthy();
  });

  it("should add new todo item without any crashing", async () => {
    ApiBase.fakeFetchCardList = jest.fn(() => Promise.resolve([]));
    ApiBase.fakeAddItemApiCall = jest.fn(() =>
      Promise.resolve(mockCardListItem1)
    );

    renderScreen();
    await waitForElementToBeRemoved(screen.queryByText(/loading/));

    expect(screen.getByText(/add item/)).toBeTruthy();

    fireEvent.click(screen.getByText(/add item/));

    expect(screen.getByText(/loading/)).toBeTruthy();

    await waitForElementToBeRemoved(screen.queryByText(/loading/));

    expect(screen.getByText(mockCardListItem1.text)).toBeTruthy();
  });

  it("should remove todo item without any crashing", async () => {
    ApiBase.fakeFetchCardList = jest.fn(() => Promise.resolve([]));
    ApiBase.fakeAddItemApiCall = jest.fn(() =>
      Promise.resolve(mockCardListItem1)
    );

    renderScreen();
    await waitForElementToBeRemoved(screen.queryByText(/loading/));

    expect(screen.getByText(/add item/)).toBeTruthy();

    fireEvent.click(screen.getByText(/add item/));

    expect(screen.getByText(/loading/)).toBeTruthy();

    await waitForElementToBeRemoved(screen.queryByText(/loading/));

    expect(screen.getByText(mockCardListItem1.text)).toBeTruthy();

    fireEvent.click(screen.getByText(/remove item/));

    expect(screen.queryByText(mockCardListItem1.text)).not.toBeTruthy();
  });

  it("should change todo item status", async () => {
    ApiBase.fakeFetchCardList = jest.fn(() => Promise.resolve([]));
    ApiBase.fakeAddItemApiCall = jest
      .fn()
      .mockReturnValueOnce(Promise.resolve(mockCardListItem1))
      .mockReturnValueOnce(Promise.resolve(mockCardListItem2));

    renderScreen();
    await waitForElementToBeRemoved(screen.queryByText(/loading/));

    expect(screen.getByText(/add item/)).toBeTruthy();

    fireEvent.click(screen.getByText(/add item/));

    expect(screen.getByText(/loading/)).toBeTruthy();

    await waitForElementToBeRemoved(screen.queryByText(/loading/));

    expect(screen.getByText(mockCardListItem1.text)).toBeTruthy();

    fireEvent.click(screen.getByText(/add item/));

    expect(screen.getByText(/loading/)).toBeTruthy();

    await waitForElementToBeRemoved(screen.queryByText(/loading/));

    expect(screen.getByText(mockCardListItem2.text)).toBeTruthy();

    ApiBase.changeStatusOfItem = jest.fn(() =>
      Promise.resolve(mockCardListItem1)
    );

    fireEvent.click(screen.getByText(/change status of item/));
    expect(screen.getByText(/loading/)).toBeTruthy();
    await waitForElementToBeRemoved(screen.queryByText(/loading/));

    expect(
      screen.getByText(`${mockCardListItem1.id}:${!mockCardListItem1.isActive}`)
    ).toBeTruthy();
  });
});
