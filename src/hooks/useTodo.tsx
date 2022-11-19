import { useEffect, useState } from "react";
import { CardListType } from "../models";

interface ITodo {
  cardList: CardListType[];
  removeItem: (id: string) => void;
  addItem: (payload: string) => void;
  changeStatusOfItem: (id: string) => void;
}

export const useTodo = (): ITodo => {
  const [cardList, setCardList] = useState<CardListType[]>([]);

  const fetchCardList = () => {
    const url = "https://6374024c0bb6b698b61a1a35.mockapi.io/api/v1/CardList";
    fetch(url).then((data) =>
      data.json().then((response) => {
        if (response) {
          setCardList(response);
        }
      })
    );
  };

  const removeItem = (id: string) => {
    const findRemovingItem: CardListType[] = cardList.filter(
      (item) => item.id !== id
    );

    setCardList(findRemovingItem);
  };

  const addItem = (data: string) => {
    setCardList((props) => [
      ...props,
      {
        id: Math.floor(Math.random() * 9999).toString(),
        text: data,
        isActive: false,
        avatar: "https://picsum.photos/300/300",
      },
    ]);
  };

  const changeStatusOfItem = (id: string) => {
    const changeStatus = cardList.map((item) =>
      item.id === id
        ? {
            ...item,
            isActive: !item.isActive,
          }
        : item
    );

    setCardList(changeStatus);
  };

  useEffect(() => {
    fetchCardList();
  }, []);

  return {
    cardList,
    removeItem,
    addItem,
    changeStatusOfItem,
  };
};
