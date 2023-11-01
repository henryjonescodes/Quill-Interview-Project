import { useEffect } from "react";
import { SharedTableFilterProps } from ".";
import TableInput from "../TableInput";
import styles from "./table-filter.module.scss";

export type RangeFilterType = [number, number];

type Props = Pick<
  SharedTableFilterProps,
  "column" | "columnFilterValue" | "setFilterText"
>;

const TableNumberRangeFilter = ({
  column,
  columnFilterValue,
  setFilterText,
}: Props) => {
  const updateFilterText = () => {
    if (!!setFilterText && !!columnFilterValue) {
      setFilterText(
        `${getStringValue(columnFilterValue[0])} ... ${getStringValue(
          columnFilterValue[1],
        )}`,
      );
      return;
    }
    setFilterText("");
  };

  const getStringValue = (str: string) => {
    if (!str?.length) {
      return `∞`;
    }
    return str;
  };

  useEffect(() => {
    updateFilterText();
  }, [columnFilterValue]);

  return (
    <div className={styles.numbers}>
      <p>Number range</p>
      <TableInput
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
        value={columnFilterValue?.[0] ?? ""}
        onChange={(value) => {
          column.setFilterValue((old: RangeFilterType) => [value, old?.[1]]);
        }}
        placeholder={`Min ${
          column.getFacetedMinMaxValues()?.[0]
            ? `(${column.getFacetedMinMaxValues()?.[0]})`
            : ""
        }`}
      />
      <TableInput
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
        value={columnFilterValue?.[1] ?? ""}
        onChange={(value) => {
          column.setFilterValue((old: RangeFilterType) => [old?.[0], value]);
        }}
        placeholder={`Max ${
          column.getFacetedMinMaxValues()?.[1]
            ? `(${column.getFacetedMinMaxValues()?.[1]})`
            : ""
        }`}
      />
    </div>
  );
};

export default TableNumberRangeFilter;
