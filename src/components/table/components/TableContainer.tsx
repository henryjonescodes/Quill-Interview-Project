import React from "react";
import styles from "./../table.module.css";
export type TableContainerProps = {
  children: React.ReactNode;
};
const TableContainer = ({ children }: TableContainerProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default TableContainer;
