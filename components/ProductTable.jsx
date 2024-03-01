"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DialogComponent from "./DialogComp";
import { Button } from "./ui/button";
import Image from "next/image";
import { deleteProduct } from "@/app/lib/actions";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import CreateProduct from "./CreateProduct";
import { Tooltip } from "primereact/tooltip";
import ViewProduct from "./ViewProduct";
import EditProduct from "./EditProduct";

export default function ProductTable({ products }) {
  const [addProductModal, setAddProductModal] = useState(false);
  const [editProductModal, setEditProductModal] = useState(false);
  const [viewProductModal, setViewProductModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [viewData, setViewData] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(JSON.parse(products));
    setLoading(false);
  }, [products]);

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between">
        <Button
          onClick={() => setAddProductModal(true)}
          className="flex items-center gap-2"
        >
          <Plus size={14} />
          Add Product
        </Button>
      </div>
    );
  };

  const priceBodyTemplate = (rowData) => {
    return <span className="text-gray-400">{rowData.price}</span>;
  };

  const dateFormatter = (dateInput) => {
    const originalDate = new Date(dateInput);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      originalDate
    );
    return formattedDate;
  };

  const createdAtTemplate = (rowData) => {
    return <div>{dateFormatter(rowData.createdAt.toString())}</div>;
  };

  const userTemplate = (rowData) => {
    return (
      <div className="flex gap-2 items-center">
        <div className="w-[100px] h-[100px] relative">
          <Image
            className="rounded-md object-cover opacity-0 transition-all"
            fill
            src={rowData.img}
            alt={rowData.title}
            sizes="(max-width: 100px)"
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />
        </div>
        <span className="text-[16px] font-semibold">{rowData.title}</span>
      </div>
    );
  };

  const descTemplate = (rowData) => {
    return (
      <>
        <p
          className="truncate max-w-[200px] desc w-fit"
          data-pr-tooltip={rowData.desc}
        >
          {rowData.desc}
        </p>
        <Tooltip target=".desc" position="bottom" />
      </>
    );
  };

  const header = renderHeader();

  const setDataHandler = (rowData) => {
    const selectedData = data.find((item) => item._id === rowData._id);
    setViewData(selectedData);
  };

  const ActionTemplate = (rowData) => {
    return (
      <div className="flex gap-5">
        <form action={deleteProduct}>
          <input name="id" type="hidden" value={rowData._id} />
          <button type="submit">
            <Trash2 className="cursor-pointer" />
          </button>
        </form>
        <Eye
          onClick={() => {
            setDataHandler(rowData);
            setViewProductModal(true);
          }}
          className="cursor-pointer"
        />
        <Edit
          onClick={() => {
            setDataHandler(rowData);
            setEditProductModal(true);
          }}
          className="cursor-pointer"
        />
      </div>
    );
  };

  return (
    <div className="card">
      <DataTable
        value={data}
        paginator
        rows={10}
        dataKey="_id"
        loading={loading}
        filterDisplay="row"
        scrollHeight="600px"
        header={header}
        emptyMessage="No products found."
      >
        <Column
          header="Product Name"
          filter
          filterField="title"
          body={userTemplate}
          showFilterMenu={false}
          filterPlaceholder="Search by name"
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Desc"
          filterField="desc"
          showFilterMenu={false}
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "10rem" }}
          filter
          body={descTemplate}
          filterPlaceholder="Search by Desc"
        />
        <Column
          header="stock"
          field="stock"
          style={{ minWidth: "12rem" }}
          showFilterMenu={false}
          sortable
        />
        <Column
          header="Price"
          sortable
          sortField="price"
          showFilterMenu={false}
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "12rem" }}
          body={priceBodyTemplate}
        />
        <Column
          header="Created At"
          style={{ minWidth: "10rem" }}
          sortable
          body={createdAtTemplate}
        />
        <Column
          field="Action"
          header="Action"
          dataType="boolean"
          style={{ minWidth: "6rem" }}
          body={ActionTemplate}
        />
      </DataTable>

      <DialogComponent
        visible={addProductModal}
        setVisible={setAddProductModal}
        header="Add Product"
      >
        <CreateProduct
          visible={addProductModal}
          setVisible={setAddProductModal}
        />
      </DialogComponent>

      {/* Edit User */}
      <DialogComponent
        visible={editProductModal}
        setVisible={setEditProductModal}
        header="Edit User"
      >
        <EditProduct
          visible={editProductModal}
          setVisible={setEditProductModal}
          viewData={viewData}
        />
      </DialogComponent>

      {/* View USer */}
      <DialogComponent
        visible={viewProductModal}
        setVisible={setViewProductModal}
        header="View Product"
      >
        <ViewProduct
          visible={viewProductModal}
          setVisible={setViewProductModal}
          viewData={viewData}
        />
      </DialogComponent>
    </div>
  );
}
