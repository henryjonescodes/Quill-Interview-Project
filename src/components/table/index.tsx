import React from "react";
import styles from "./table.module.css";
import cn from "classnames";

export interface Field {
  name: string;
  label: string;
  jsType: "date" | "string" | "number";
}

interface TableProps {
  title?: string;
  rows: object[];
  columns: Field[];
  // dateField: string; // ! wtf is this?

  headerComponent?: React.ReactNode;
  rowComponent?: React.ReactNode;
  ContainerComponent?: React.ComponentType<{ children: React.ReactNode }>;
}

const WrapperComponent = ({ children }: { children: React.ReactNode }) => {
  return <div className="wrapper">{children}</div>;
};

const Table = ({
  ContainerComponent,
  title = "hello",
  ...props
}: TableProps) => {
  const content = (
    <div className={styles.content}>
      {!!title && <span className={styles.contentHeader}>{title}</span>}
    </div>
  );
  if (!ContainerComponent) {
    return <div className={styles.table}>{content}</div>;
  }
  return <ContainerComponent>{content}</ContainerComponent>;
};

export default Table;
