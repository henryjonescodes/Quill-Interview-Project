import { useEffect } from "react";
import { SharedTableFilterProps } from ".";
import TableInput from "../TableInput";
import styles from "./table-filter.module.scss";

export type DateRangeFilterType = [Date, Date];

type Props = Pick<
  SharedTableFilterProps,
  "column" | "columnFilterValue" | "setFilterText" | "setFilterText"
>;

const TableDateRangeFilter = ({
  column,
  columnFilterValue,
  setFilterText,
}: Props) => {
  const minMaxValues = column.getFacetedMinMaxValues();

  const updateFilterText = () => {
    if (!!setFilterText && !!columnFilterValue) {
      const _str0 = getStringValue(columnFilterValue[0]);
      const _str1 = getStringValue(columnFilterValue[1]);
      if (_str0 === `∞` && _str1 === `∞`) {
        setFilterText("");
        return;
      }
      setFilterText(`${_str0} ... ${_str1}`);
    }
  };
  function formatDateString(dateString) {
    const [year, month] = dateString.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "short",
    });
  }

  const getStringValue = (str: string) => {
    if (!str?.length) {
      return `∞`;
    }
    return formatDateString(str);
  };

  useEffect(() => {
    updateFilterText();
  }, [columnFilterValue]);

  return (
    <div className={styles.dates}>
      <p>Date range</p>
      <TableInput
        type="month"
        min={minMaxValues?.[0] ?? ""}
        max={minMaxValues?.[1] ?? ""}
        value={columnFilterValue?.[0] ?? ""}
        onChange={(value) =>
          column.setFilterValue((old: DateRangeFilterType) => [
            value ?? "",
            old?.[1],
          ])
        }
      />
      <TableInput
        type="month"
        min={minMaxValues?.[0] ?? ""}
        max={minMaxValues?.[1] ?? ""}
        value={columnFilterValue?.[1] ?? ""}
        onChange={(value) =>
          column.setFilterValue((old: DateRangeFilterType) => [
            old?.[0],
            value ?? "",
          ])
        }
      />
    </div>
  );
};

export default TableDateRangeFilter;
