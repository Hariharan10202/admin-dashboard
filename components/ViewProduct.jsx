"use client";

import Image from "next/image";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

import { InputTextarea } from "primereact/inputtextarea";

const ViewProduct = ({ viewData }) => {
  return (
    <>
      <div className="p-5 flex w-full items-start justify-between gap-5">
        <div className="relative w-[300px] h-[250px] p-5">
          <Image
            className="rounded-2xl object-cover opacity-0 transition-all"
            src={viewData.img}
            fill
            alt="user-image"
            sizes="(max-width: 300px)"
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />
        </div>

        <div className="flex-1 flex flex-col gap-y-5">
          <InputText
            value={viewData.title}
            id="name"
            name="name"
            readOnly
            className="w-full"
          />
          <InputTextarea
            id="desc"
            name="desc"
            rows={6}
            autoResize
            value={viewData.desc}
            className="w-full"
          />
          <InputNumber id="stock" value={viewData.stock} className="w-full" />
          <div className="flex gap-5 items-center">
            <InputText id="price" value={viewData.price} className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
