"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { data } from "@/app/data";
import Image from "next/image";

export default function DashboardTable() {
  const [products, setProducts] = useState(data);
  const columns = [
    { field: "Name", header: "Name" },
    { field: "Status", header: "Status" },
    { field: "Date", header: "Date" },
    { field: "Amount", header: "Amount" },
  ];

  const userTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        <div className="relative w-9 h-9">
          <Image
            className="rounded-full"
            fill
            src={"/Images/user.png"}
            alt="user"
            sizes="(max-width: 36px)"
          />
        </div>
        <span>{rowData.Name}</span>
      </div>
    );
  };

  return (
    <div className="text-black dark:text-white text-[24px] font-bold card">
      <h1 className="mb-4">Latest Transcations</h1>
      <DataTable value={products} scrollHeight="400px">
        {columns.map((col, i) => (
          <Column
            sortable
            className="text-sm hover:bg-inherit"
            key={col.field}
            body={col.field === "Name" && userTemplate}
            field={col.field}
            header={col.header}
          />
        ))}
      </DataTable>
    </div>
  );
}
