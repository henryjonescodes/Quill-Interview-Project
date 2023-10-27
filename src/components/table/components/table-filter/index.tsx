import { Column, Table } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Entry } from "../..";
import TableCheckboxFilter from "./TableCheckboxFilter";
import TableDateRangeFilter from "./TableDateRangeFilter";
import TableNumberRangeFilter, {
  RangeFilterType,
} from "./TableNumberRangeFilter";
import TableTextFilter from "./TableTextFilter";
import styles from "./table-filter.module.scss";

export type SharedTableFilterProps = {
  column: Column<Entry, any>;
  table: Table<Entry>;
  sortedUniqueValues: any[];
  columnFilterValue: any;
  firstValue: any;
};

type Props = {
  checkboxThreshold?: number;
} & Pick<SharedTableFilterProps, "column" | "table">;

const TableFilter = ({ column, table, checkboxThreshold = 10 }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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

  return (
    <div className={styles.filter}>
      <div className={styles.button} onClick={toggleDropdown}>
        + Add filter
      </div>
      {isOpen && <div className={styles.filterContent}>{filterContent}</div>}
    </div>
  );
};

export default TableFilter;
