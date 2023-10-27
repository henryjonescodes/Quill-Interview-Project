import styles from "./../../table.module.scss";
import { SharedTableFilterProps } from ".";
import TableInput from "../TableInput";

export type RangeFilterType = [number, number];

type Props = Pick<
  SharedTableFilterProps,
  "column" | "columnFilterValue" | "sortedUniqueValues"
>;

const TableTextFilter = ({
  column,
  columnFilterValue,
  sortedUniqueValues,
}: Props) => {
  return (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>

      <TableInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value ? [value] : null)}
        placeholder={`Search...`}
        className={styles.filterInput}
        list={column.id + "list"}
      />
    </>
  );
};

export default TableTextFilter;
