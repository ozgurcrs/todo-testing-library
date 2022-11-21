import { useEffect, useState } from "react";
import { CardListType } from "../models";
import Api from "../api";

interface ITodo {
  cardList: CardListType[];
  removeItem: (id: string) => void;
  addItem: (payload: string) => Promise<void>;
  changeStatusOfItem: (id: string) => Promise<void>;
  loading: boolean;
}

const useTodo = (): ITodo => {
  const [cardList, setCardList] = useState<CardListType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCardList = async () => {
    try {
      setLoading(true);
      const data = await Api.fakeFetchCardList();

      setCardList(data);
    } catch (error) {
      setCardList([]);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = (id: string) => {
    const findRemovingItem: CardListType[] = cardList.filter(
      (item) => item.id !== id
    );

    setCardList(findRemovingItem);
  };

  const addItem = async (data: string): Promise<void> => {
    try {
      setLoading(true);

      const addedItem = await Api.fakeAddItemApiCall(data);

      setCardList((props) => {
        return [...props, addedItem];
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const changeStatusOfItem = async (id: string) => {
    try {
      setLoading(true);
      const changedItem = await Api.changeStatusOfItem(id);
      if (changedItem) {
        setCardList((props) => {
          const changedIndex = props.findIndex(
            (item) => item.id === changedItem.id
          );
          props[changedIndex] = changedItem;

          return props;
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardList();
  }, []);

  return {
    cardList,
    removeItem,
    addItem,
    changeStatusOfItem,
    loading,
  };
};

export default useTodo;
