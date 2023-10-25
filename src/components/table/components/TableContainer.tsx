import React from "react";

export type TableContainerProps = {
  children: React.ReactNode;
};
const TableContainer = ({ children }: TableContainerProps) => {
  return <div style={{ border: "1px solid green" }}>{children}</div>;
};

export default TableContainer;
