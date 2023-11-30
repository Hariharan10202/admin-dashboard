"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { ImagePlusIcon, User, VerifiedIcon } from "lucide-react";
import { AiFillMinusCircle } from "react-icons/ai";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/lib/firebase";
import { Button } from "primereact/button";
import { addProduct } from "@/app/lib/actions";
import { z } from "zod";
import { InputTextarea } from "primereact/inputtextarea";

const storage = getStorage(app);

const formSchema = z
  .object({
    title: z.string().min(4).max(20),
    desc: z.string(),
    price: z.string(),
    stock: z.number(),
    img: z.string().optional(),
  })
  .strict();

const CreateProduct = ({ setVisible }) => {
  const [image, setImage] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [stock, setStock] = useState(null);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    const uploadHandler = () => {
      const fileName = new Date().getTime + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              setProgress(true);
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProgress(false);
            setFileUrl(downloadURL);
          });
        }
      );
    };
    image && uploadHandler();
  }, [image]);

  const clientAction = async (formData) => {
    const { name, desc, stock, price } = Object.fromEntries(formData);

    const result = formSchema.safeParse({
      title: name,
      desc,
      stock: parseInt(stock),
      price,
      img: fileUrl ? fileUrl : "",
    });
    if (!result.success) console.log(result);
    else {
      await addProduct(result.data);
    }

    setVisible(false);
  };

  return (
    <form action={clientAction}>
      <div className="p-5 flex w-full items-start justify-between gap-5">
        {fileUrl ? (
          <div className="relative w-[300px] h-[250px] p-5">
            <Image
              className="rounded-2xl object-cover"
              src={fileUrl}
              fill
              sizes="(max-width: 300px)"
              alt="user-image"
            />
            <AiFillMinusCircle
              size={30}
              onClick={() => setFileUrl("")}
              className="cursor-pointer z-[99] absolute right-[-10px] top-[-10px]"
            />
          </div>
        ) : (
          <div className="flex-1 border border-dotted rounded-3xl p-5 flex justify-center">
            <>
              <label htmlFor="upload-image">
                <ImagePlusIcon size={250} />
              </label>
              <input
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                type="file"
                className="hidden"
                id="upload-image"
              />
            </>
          </div>
        )}
        <div className="flex-1 flex flex-col gap-y-5">
          <span className="p-float-label">
            <InputText
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              name="name"
              className="w-full"
            />
            <label htmlFor="name">Product Name</label>
          </span>
          <span className="p-float-label">
            <InputTextarea
              onChange={(e) => setDesc(e.target.value)}
              id="desc"
              name="desc"
              rows={6}
              autoResize
              value={desc}
              className="w-full"
            />
            <label htmlFor="desc">Description</label>
          </span>
          <span className="p-float-label">
            <InputNumber
              id="stock"
              useGrouping={false}
              value={stock}
              name="stock"
              min={1}
              max={100}
              onChange={(e) => {
                setStock(e.value);
              }}
              className="w-full"
            />
            <label htmlFor="stock">Stock</label>
          </span>
          <div className="flex gap-5 items-center">
            <span className="p-float-label">
              <InputNumber
                id="price"
                value={price}
                name="price"
                onChange={(e) => {
                  setPrice(e.value);
                }}
                className="w-full"
                locale="en-US"
                mode="currency"
                currency="USD"
                placeholder="Price"
              />
              <label htmlFor="price">Price</label>
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5 justify-end px-5">
        <Button loading={progress} outlined>
          Discard
        </Button>
        <Button loading={progress}>Save</Button>
      </div>
    </form>
  );
};

export default CreateProduct;
