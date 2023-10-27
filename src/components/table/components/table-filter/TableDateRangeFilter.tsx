import { SharedTableFilterProps } from ".";

export type DateRangeFilterType = [Date, Date];

type Props = Pick<SharedTableFilterProps, "column" | "columnFilterValue">;

const TableDateRangeFilter = ({ column, columnFilterValue }: Props) => {
  const minMaxValues = column.getFacetedMinMaxValues();

  return (
    <>
      <input
        type="month"
        min={minMaxValues?.[0] ?? ""}
        max={minMaxValues?.[1] ?? ""}
        value={columnFilterValue?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old) => [e.target.value, old?.[1]])
        }
      />
      <input
        type="month"
        min={minMaxValues?.[0] ?? ""}
        max={minMaxValues?.[1] ?? ""}
        value={columnFilterValue?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old) => [old?.[0], e.target.value])
        }
      />
    </>
  );
};

export default TableDateRangeFilter;
