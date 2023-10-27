import { SharedTableFilterProps } from ".";
import TableInput from "../TableInput";
import styles from "./table-filter.module.scss";

export type DateRangeFilterType = [Date, Date];

type Props = Pick<SharedTableFilterProps, "column" | "columnFilterValue">;

const TableDateRangeFilter = ({ column, columnFilterValue }: Props) => {
  const minMaxValues = column.getFacetedMinMaxValues();

  return (
    <div className={styles.dates}>
      <p>Select date range</p>
      <TableInput
        type="month"
        min={minMaxValues?.[0] ?? ""}
        max={minMaxValues?.[1] ?? ""}
        value={columnFilterValue?.[0] ?? ""}
        onChange={(value) =>
          column.setFilterValue((old: DateRangeFilterType) => [old?.[1], value])
        }
      />
      <TableInput
        type="month"
        min={minMaxValues?.[0] ?? ""}
        max={minMaxValues?.[1] ?? ""}
        value={columnFilterValue?.[1] ?? ""}
        onChange={(value) =>
          column.setFilterValue((old: DateRangeFilterType) => [old?.[0], value])
        }
      />
    </div>
  );
};

export default TableDateRangeFilter;
