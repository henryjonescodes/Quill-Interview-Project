import { Column, Table } from "@tanstack/react-table";
import { Fragment, useMemo } from "react";
import TableInput from "../TableInput";
import TableNumberRangeFilter, {
  RangeFilterType,
} from "./TableNumberRangeFilter";
import styles from "./../../table.module.css";
import TableCheckboxFilter from "./TableCheckboxFilter";
import TableTextFilter from "./TableTextFilter";
import { Entry } from "../..";
import TableDateRangeFilter from "./TableDateRangeFilter";

export type SharedTableFilterProps = {
  column: Column<Entry, unknown>;
  table: Table<Entry>;
  sortedUniqueValues: any[];
  columnFilterValue: any;
  firstValue: any;
};

type Props = {
  checkboxThreshold?: number;
} & Pick<SharedTableFilterProps, "column" | "table">;

const TableFilter = ({ column, table, checkboxThreshold = 10 }: Props) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  const filterContent =
    typeof firstValue === "number" ? (
      <TableNumberRangeFilter
        column={column}
        columnFilterValue={columnFilterValue as RangeFilterType}
      />
    ) : typeof firstValue === "string" ? (
      sortedUniqueValues?.length < checkboxThreshold ? (
        <TableTextFilter
          column={column}
          columnFilterValue={columnFilterValue}
          sortedUniqueValues={sortedUniqueValues}
        />
      ) : (
        <TableCheckboxFilter
          column={column}
          sortedUniqueValues={sortedUniqueValues}
        />
      )
    ) : firstValue instanceof Date ? (
      <TableDateRangeFilter
        column={column}
        columnFilterValue={columnFilterValue as RangeFilterType}
      />
    ) : null;

  return <div className={styles.filter}>{filterContent}</div>;
};

export default TableFilter;
