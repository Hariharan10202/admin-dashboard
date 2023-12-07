"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { ImagePlusIcon, User, VerifiedIcon } from "lucide-react";
import { AiFillMinusCircle } from "react-icons/ai";
import { Dropdown } from "primereact/dropdown";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/lib/firebase";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { addUser, updateUser } from "@/app/lib/actions";
import { z } from "zod";
import toast from "react-hot-toast";

const storage = getStorage(app);

const formSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: "Username should be alteast 4 charater" })
      .max(20),
    email: z.string().min(6, { message: "Email should be alteast 6 charater" }),
    phone: z
      .string()
      .min(10, { message: "Invalid phone number" })
      .max(12, { message: "Invalid phone number" }),
    gender: z.string().refine((data) => data.length > 0, {
      message: "Gender is mandatory",
    }),
    role: z.object({ name: z.string(), isAdmin: z.boolean() }),
    img: z.string().optional(),
  })
  .strict();

const EditUser = ({ viewData, setVisible }) => {
  const roles = [
    { name: "Admin", isAdmin: true },
    { name: "User", isAdmin: false },
  ];

  const [image, setImage] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [gender, setGender] = useState(viewData.gender);
  const [selectedRole, setSelectedRole] = useState(viewData.role);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState(null);
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

  const selectedRoleTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center gap-2">
          {option.isAdmin ? <VerifiedIcon /> : <User />}
          <div>{option.name}</div>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const roleTemplate = (option) => {
    return (
      <div className="flex align-items-center gap-2">
        {option.isAdmin ? <VerifiedIcon /> : <User />}
        <div>{option.name}</div>
      </div>
    );
  };

  const clientAction = async (formData) => {
    const { username, email, phone } = Object.fromEntries(formData);

    const result = formSchema.safeParse({
      username,
      email,
      phone,
      gender,
      role: selectedRole,
      img: fileUrl ? fileUrl : viewData.img,
    });
    if (!result.success) {
      console.log(result.error.issues);
      return toast.error(result.error.issues[0].message);
    } else {
      await updateUser(viewData._id, result.data);
    }

    setVisible(false);
  };

  return (
    <form action={clientAction}>
      <div className="p-5 flex w-full justify-between gap-5">
        {}
        {fileUrl || viewData.img ? (
          <div className="relative w-[300px] h-[250px] p-5">
            <Image
              className="rounded-2xl object-cover"
              src={fileUrl ? fileUrl : viewData.img}
              fill
              alt="user-image"
              sizes="(max-width: 300px)"
            />
            <AiFillMinusCircle
              size={30}
              onClick={() => {
                setFileUrl("");
                viewData.img = "";
              }}
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
              defaultValue={viewData.username}
              onChange={(e) => setName(e.target.value)}
              id="username"
              name="username"
              className="w-full"
            />
            <label htmlFor="username">Full name</label>
          </span>
          <span className="p-float-label">
            <InputText
              defaultValue={viewData.email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              className="w-full"
            />
            <label htmlFor="username">Email</label>
          </span>
          <span className="p-float-label">
            <InputNumber
              id="number-input"
              useGrouping={false}
              value={viewData.phone}
              name="phone"
              onChange={(e) => {
                setContact(e.value);
              }}
              className="w-full"
            />
            <label htmlFor="number-input">Contact Number</label>
          </span>
          <div className="flex gap-5 items-center">
            <div className="flex flex-col gap-y-2">
              <div className="flex align-items-center">
                <RadioButton
                  inputId="gender1"
                  name="gender"
                  value="Male"
                  onChange={(e) => setGender(e.value)}
                  checked={viewData.gender === "Male"}
                />
                <label htmlFor="gender1" className="ml-2">
                  Male
                </label>
              </div>
              <div className="flex align-items-center">
                <RadioButton
                  inputId="gender2"
                  name="gender"
                  value="Female"
                  onChange={(e) => setGender(e.value)}
                  checked={viewData.gender === "Female"}
                />
                <label htmlFor="gender2" className="ml-2">
                  Female
                </label>
              </div>
            </div>
            <div className="mt-5">
              <span className="p-float-label">
                <Dropdown
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.value)}
                  options={roles}
                  name="name"
                  optionLabel="role"
                  placeholder="Select a Role"
                  valueTemplate={selectedRoleTemplate}
                  itemTemplate={roleTemplate}
                  inputId="role"
                />
                <label htmlFor="role">Select a City</label>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5 justify-end px-5">
        <Button
          onClick={() => setVisible(false)}
          type="button"
          loading={progress}
          outlined
        >
          Discard
        </Button>
        <Button loading={progress}>Save</Button>
      </div>
    </form>
  );
};

export default EditUser;
