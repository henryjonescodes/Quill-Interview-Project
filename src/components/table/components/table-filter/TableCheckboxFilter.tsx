import { Fragment, useMemo } from "react";
import { SharedTableFilterProps } from ".";
import styles from "./table-filter.module.scss";

type Props = Pick<SharedTableFilterProps, "column" | "sortedUniqueValues">;

const TableCheckboxFilter = ({ column, sortedUniqueValues }: Props) => {
  const toggle = (filterArr: any, val: any) => {
    if (!filterArr) {
      return [val];
    }
    if (filterArr.includes(val)) {
      filterArr = filterArr.filter((n: any) => {
        return n !== val;
      });
    } else filterArr.push(val);

    if (filterArr.length === 0) filterArr = undefined;
    return filterArr;
  };

  const items = useMemo(() => {
    return sortedUniqueValues.map((option: string, i) => (
      <Fragment key={i}>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            style={{
              marginRight: "8px",
            }}
            id={option}
            name={option}
            value={option}
            checked={Boolean(
              [...((column?.getFilterValue() as string[]) ?? [])]?.includes(
                option
              )
            )}
            onChange={(e) => {
              column.setFilterValue(
                toggle(column.getFilterValue(), e.target.value)
              );
            }}
          />
          <label htmlFor={option} style={{ margin: 0 }}>
            {option}
          </label>
        </div>
      </Fragment>
    ));
  }, [sortedUniqueValues, column]);

  return <div className={styles.checkboxes}>{items}</div>;
};

export default TableCheckboxFilter;
