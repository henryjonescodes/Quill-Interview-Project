import { Column, Table } from "@tanstack/react-table";
import { Fragment, useMemo } from "react";
import styles from "./../../table.module.css";
import TableInput from "../TableInput";
import { SharedTableFilterProps } from ".";

export type RangeFilterType = [number, number];

type Props = Pick<SharedTableFilterProps, "column" | "columnFilterValue">;

const TableNumberRangeFilter = ({ column, columnFilterValue }: Props) => {
  return (
    <>
      <TableInput
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
        value={columnFilterValue?.[0] ?? ""}
        onChange={(value) =>
          column.setFilterValue((old: RangeFilterType) => [value, old?.[1]])
        }
        placeholder={`Min`}
        className={styles.filterInput}
      />
      <TableInput
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
        value={columnFilterValue?.[1] ?? ""}
        onChange={(value) =>
          column.setFilterValue((old: RangeFilterType) => [old?.[0], value])
        }
        placeholder={`Max`}
        className={styles.filterInput}
      />
    </>
  );
};

export default TableNumberRangeFilter;
