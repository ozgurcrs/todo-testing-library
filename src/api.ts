import { CardListType } from "./models";
import { mockData } from "./mockData";

class Api {
  static async fakeAddItemApiCall(data: string): Promise<CardListType> {
    return new Promise((resolve) => {
      resolve({
        id: Math.floor(Math.random() * 9999).toString(),
        text: data,
        isActive: false,
        avatar: "https://picsum.photos/300/300",
      });
    });
  }

  static async fakeFetchCardList(): Promise<CardListType[]> {
    return new Promise((resolve) => {
      resolve([]);
    });
  }

  static async changeStatusOfItem(id: string): Promise<CardListType> {
    return new Promise((resolve) => {
      resolve({ ...mockData[0], id, isActive: true });
    });
  }
}

export default Api;
