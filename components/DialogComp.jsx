"use client";

import { Dialog } from "primereact/dialog";
import { useState } from "react";

const DialogComponent = ({ visible, setVisible, header, children }) => {
  return (
    <Dialog
      header={header}
      visible={visible}
      style={{ width: "50vw" }}
      blockScroll
      draggable={false}
      onHide={() => setVisible(false)}
    >
      {children}
    </Dialog>
  );
};

export default DialogComponent;
