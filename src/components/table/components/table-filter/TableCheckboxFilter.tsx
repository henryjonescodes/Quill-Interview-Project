import { Fragment, useEffect, useMemo } from "react";
import { SharedTableFilterProps } from ".";
import styles from "./table-filter.module.scss";

type Props = Pick<
  SharedTableFilterProps,
  "column" | "sortedUniqueValues" | "setFilterText" | "columnFilterValue"
>;

const TableCheckboxFilter = ({
  column,
  sortedUniqueValues,
  setFilterText,
  columnFilterValue,
}: Props) => {
  const updateFilterText = () => {
    if (!!setFilterText && !!columnFilterValue) {
      const _count = columnFilterValue?.length;
      setFilterText(!!_count ? `${_count} selected` : "");
      return;
    }
    setFilterText("");
  };

  useEffect(() => {
    updateFilterText();
  }, [columnFilterValue, sortedUniqueValues]);

  const toggle = (filterArr: string[] = [], val: string) => {
    const newArr = filterArr.includes(val)
      ? filterArr.filter((n) => n !== val)
      : [...filterArr, val];

    return newArr.length > 0 ? newArr : undefined;
  };

  const items = useMemo(() => {
    const _diff = columnFilterValue?.filter(
      (element) => !sortedUniqueValues.includes(element),
    );

    const _arr = !!_diff
      ? [..._diff, ...sortedUniqueValues]
      : sortedUniqueValues;
    return _arr.map((option: string, i) => (
      <Fragment key={i}>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            id={option}
            name={option}
            value={option}
            checked={Boolean(
              [...((columnFilterValue as string[]) ?? [])]?.includes(option),
            )}
            onChange={(e) => {
              column.setFilterValue(toggle(columnFilterValue, e.target.value));
            }}
          />
          <label htmlFor={option} style={{ margin: 0 }}>
            {option}
          </label>
        </div>
      </Fragment>
    ));
  }, [sortedUniqueValues, columnFilterValue]);

  return <div className={styles.checkboxes}>{items}</div>;
};

export default TableCheckboxFilter;
