import { Product, User } from "./model";
import { connectToDB } from "./utils";

export const fetchUsers = async () => {
  try {
    connectToDB();
    const user = await User.find();
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchProducts = async () => {
  try {
    connectToDB();
    const products = await Product.find();
    return products;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};
