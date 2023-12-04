"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DialogComponent from "./DialogComp";
import CreateUser from "./CreateUser";
import { Button } from "./ui/button";
import Image from "next/image";
import { RiAdminFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";
import { deleteUser } from "@/app/lib/actions";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import EditUser from "./EditUser";
import { MultiSelect } from "primereact/multiselect";
import ViewUser from "./ViewUser";

export default function UserTable({ users }) {
  const [addUserModal, setAddUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [viewUserModal, setViewUserModal] = useState(false);

  const [viewData, setViewData] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(JSON.parse(users));
  }, [users]);

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between">
        <Button
          onClick={() => setAddUserModal(true)}
          className="flex items-center gap-2"
        >
          <Plus size={14} />
          Add user
        </Button>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    const role = rowData.role;

    return (
      <div className="flex gap-1 items-center">
        {role.isAdmin ? <RiAdminFill size={20} /> : <FaUser size={20} />}
        <p>{role.name}</p>
      </div>
    );
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
        <div className="w-9 h-9 relative">
          <Image
            className="rounded-full object-cover opacity-0 transition-all"
            fill
            src={rowData.img}
            alt={rowData.username}
            sizes="(max-width: 36)"
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />
        </div>
        <span className="text-[16px] font-semibold">{rowData.username}</span>
      </div>
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
        <form action={deleteUser}>
          <input name="id" type="hidden" value={rowData._id} />
          <button>
            <Trash2 className="cursor-pointer" />
          </button>
        </form>
        <Eye
          onClick={() => {
            setDataHandler(rowData);
            setViewUserModal(true);
          }}
          className="cursor-pointer"
        />
        <Edit
          onClick={() => {
            setDataHandler(rowData);
            setEditUserModal(true);
          }}
          className="cursor-pointer"
        />
      </div>
    );
  };

  const roles = [
    { name: "Admin", isAdmin: true },
    { name: "User", isAdmin: false },
  ];

  return (
    <div className="card ">
      <DataTable
        value={data}
        paginator
        rows={10}
        dataKey="_id"
        filterDisplay="row"
        scrollHeight="600px"
        header={header}
        emptyMessage="No customers found."
      >
        <Column
          field="username"
          header="Name"
          filter
          body={userTemplate}
          showFilterMenu={false}
          filterPlaceholder="Search by name"
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Email"
          field="email"
          showFilterMenu={false}
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "10rem" }}
          filter
          filterPlaceholder="Search Email"
        />
        <Column
          header="phone"
          field="phone"
          style={{ minWidth: "12rem" }}
          showFilterMenu={false}
          filter
          filterPlaceholder="Search Contact"
        />
        <Column header="Gender" field="gender" style={{ minWidth: "12rem" }} />

        <Column
          header="Role"
          field="role.name"
          showFilterMenu={false}
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "12rem" }}
          body={statusBodyTemplate}
          sortable
        />
        <Column
          header="Created At"
          field="createdAt"
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
        visible={addUserModal}
        setVisible={setAddUserModal}
        header="Add User"
      >
        <CreateUser visible={addUserModal} setVisible={setAddUserModal} />
      </DialogComponent>

      {/* Edit User */}
      <DialogComponent
        visible={editUserModal}
        setVisible={setEditUserModal}
        header="Edit User"
      >
        <EditUser
          visible={editUserModal}
          viewData={viewData}
          setVisible={setEditUserModal}
        />
      </DialogComponent>

      {/* View USer */}
      <DialogComponent
        visible={viewUserModal}
        setVisible={setViewUserModal}
        header="View User"
      >
        <ViewUser
          visible={viewUserModal}
          setVisible={setViewUserModal}
          viewData={viewData}
        />
      </DialogComponent>
    </div>
  );
}
