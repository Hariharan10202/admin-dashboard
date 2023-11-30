"use server";
import bcrypt from "bcrypt";
const saltRounds = 10;

import { revalidatePath } from "next/cache";
import { Product, User, UserCred } from "./model";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";

export const registerUser = async (data) => {
  try {
    connectToDB();
    const { password, email } = Object.fromEntries(data);
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new UserCred({ email, password: hashedPassword });
    await newUser.save();
  } catch (err) {
    throw new Error(err);
  }
  redirect("/login");
};

export const addUser = async (data) => {
  try {
    connectToDB();

    const { password } = data;

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ ...data, password: hashedPassword });
    await newUser.save();
  } catch (err) {
    throw new Error(err);
  }
  revalidatePath("/dashboard/users");
};

// Update user

export const updateUser = async (userIdToUpdate, data) => {
  try {
    const result = await User.updateOne(
      { _id: userIdToUpdate },
      { $set: data }
    );
  } catch (error) {
    console.error(error);
  }
  revalidatePath("dashboard/users");
};

// Delete user

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    throw new Error(err);
  }
  revalidatePath("/dashboard/users");
};

// products

// createProduct

export const addProduct = async (data) => {
  try {
    connectToDB();
    const newProduct = new Product(data);
    await newProduct.save();
  } catch (err) {
    throw new Error(err);
  }
  revalidatePath("/dashboard/products");
};

// deletrProduct

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (err) {
    throw new Error(err);
  }
  revalidatePath("/dashboard/products");
};

// EditProduct

export const updateProduct = async (productIdToUpdate, data) => {
  try {
    const result = await Product.updateOne(
      { _id: productIdToUpdate },
      { $set: data }
    );
  } catch (error) {
    console.error(error);
  }
  revalidatePath("dashboard/products");
};
