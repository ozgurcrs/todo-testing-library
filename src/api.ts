import { CardListType } from "./models";
import { mockData } from "./mockData";

class Api {
  static async fakeAddItemApiCall(data: string): Promise<CardListType> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.floor(Math.random() * 9999).toString(),
          text: data,
          isActive: false,
          avatar: "https://picsum.photos/300/300",
        });
      }, 1000);
    });
  }

  static async fakeFetchCardList(): Promise<CardListType[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData);
      }, 1000);
    });
  }

  static async changeStatusOfItem(id: string): Promise<CardListType> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...mockData[0], id, isActive: true });
      }, 1000);
    });
  }
}

export default Api;
