import { Column, Table } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ColumnsType } from "../..";
import TableCheckboxFilter from "./TableCheckboxFilter";
import TableDateRangeFilter from "./TableDateRangeFilter";
import TableNumberRangeFilter, {
  RangeFilterType,
} from "./TableNumberRangeFilter";
import TableTextFilter from "./TableTextFilter";
import styles from "./table-filter.module.scss";

export type SharedTableFilterProps = {
  column: Column<ColumnsType, any>;
  table: Table<ColumnsType>;
  sortedUniqueValues: any[];
  columnFilterValue: any;
  firstValue: any;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
};

type Props = {
  checkboxThreshold?: number;
} & Pick<SharedTableFilterProps, "column" | "table">;

const TableFilter = ({ column, table, checkboxThreshold = 10 }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filterText, setFilterText] = useState("");

  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue: string | any[] = column.getFilterValue() as any;

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()],
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const isNumber = typeof firstValue === "number";
  const isString = typeof firstValue === "string";
  // @ts-ignore
  const isDateColumn = column.columnDef?.accessorKey === "date";
  const shouldUseTextFilter =
    sortedUniqueValues?.length > checkboxThreshold &&
    !(columnFilterValue?.length >= 2);

  const commonProps = {
    setFilterText,
    column,
    columnFilterValue,
  };

  const filterContent = isNumber ? (
    <TableNumberRangeFilter
      {...commonProps}
      columnFilterValue={columnFilterValue as RangeFilterType}
    />
  ) : isDateColumn ? (
    <TableDateRangeFilter
      {...commonProps}
      columnFilterValue={columnFilterValue as RangeFilterType}
    />
  ) : isString ? (
    shouldUseTextFilter ? (
      <TableTextFilter
        {...commonProps}
        sortedUniqueValues={sortedUniqueValues}
      />
    ) : (
      <TableCheckboxFilter
        {...commonProps}
        sortedUniqueValues={sortedUniqueValues}
      />
    )
  ) : null;

  return (
    <div className={styles.filter}>
      <h4 className={styles.button} onClick={toggleDropdown}>
        {filterText?.length ? filterText : "+ Add filter"}
      </h4>
      {isOpen && <div className={styles.filterContent}>{filterContent}</div>}
    </div>
  );
};

export default TableFilter;
