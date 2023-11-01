import styles from "./table-filter.module.scss";
import { SharedTableFilterProps } from ".";
import TableInput from "../TableInput";
import { useEffect } from "react";

export type RangeFilterType = [number, number];

type Props = Pick<
  SharedTableFilterProps,
  "column" | "columnFilterValue" | "sortedUniqueValues" | "setFilterText"
>;

const TableTextFilter = ({
  column,
  columnFilterValue,
  sortedUniqueValues,
  setFilterText,
}: Props) => {
  const updateFilterText = () => {
    if (!!setFilterText && !!columnFilterValue) {
      setFilterText(columnFilterValue);
      return;
    }
    setFilterText("");
  };

  useEffect(() => {
    updateFilterText();
  }, [columnFilterValue]);

  return (
    <div className={styles.textFilter}>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>

      <TableInput
        type="text"
        value={(columnFilterValue?.[0] ?? "") as string}
        onChange={(value) => column.setFilterValue(value ? [value] : null)}
        placeholder={`Search...`}
        className={styles.input}
        list={column.id + "list"}
      />
    </div>
  );
};

export default TableTextFilter;
