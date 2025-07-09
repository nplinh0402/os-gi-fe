import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  getProductsData() {
    return [
      {
        id: 1,
        code: "f230fh0g3",
        name: "phatvh",
        username: "admin",
        password: "123456",

        createdAt: 1750630512595,
        lastLogin: 1750630512595,
      },
      {
        id: 2,
        code: "f230fh0g2",
        name: "phatvh",
        username: "admin1",
        password: "123456",

        createdAt: 1750630512595,
        lastLogin: 1750630512595,
      },
      {
        id: 3,
        code: "f330fh0g3",
        name: "phatvh",
        username: "admin2",
        password: "123456",

        createdAt: 1750630512595,
        lastLogin: 1750630512595,
      },
      {
        id: 4,
        code: "f230fh0g4",
        name: "phatvh",
        username: "admin3",
        password: "123456",

        createdAt: 1750630512595,
        lastLogin: 1750630512595,
      },
    ];
  }

  getProductsWithOrdersData() {
    return [
      {
        id: 1,
        code: "f230fh0g3",
        name: "phatvh",
        username: "admin",
        password: "123456",
        createdAt: 1750630512595,
        lastLogin: 1750630512595,
      },
      {
        id: 2,
        code: "f230fh0g2",
        name: "phatvh",
        password: "123456",
        username: "admin1",
        createdAt: 1750630512595,
        lastLogin: 1750630512595,
      },
      {
        id: 3,
        code: "f330fh0g3",
        name: "phatvh",
        username: "admin2",
        password: "123456",

        createdAt: 1750630512595,
        lastLogin: 1750630512595,
      },
      {
        id: 4,
        code: "f230fh0g4",
        name: "phatvh",
        username: "admin3",
        password: "123456",

        createdAt: 1750630512595,
        lastLogin: 1750630512595,
      },
    ];
  }

  getProductsMini() {
    return Promise.resolve(this.getProductsData().slice(0, 5));
  }

  getProductsSmall() {
    return Promise.resolve(this.getProductsData().slice(0, 10));
  }

  getProducts() {
    return Promise.resolve(this.getProductsData());
  }

  getProductsWithOrdersSmall() {
    return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
  }

  getProductsWithOrders() {
    return Promise.resolve(this.getProductsWithOrdersData());
  }
}
