import { Fragment, useState } from "react";
import { SharedTableFilterProps } from ".";

type Props = Pick<SharedTableFilterProps, "column" | "sortedUniqueValues">;

const TableCheckboxFilter = ({ column, sortedUniqueValues }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
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
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        style={{
          cursor: "pointer",
          padding: "8px",
          border: "1px solid black",
          borderRadius: "4px",
        }}
        onClick={toggleDropdown}
      >
        Select
      </div>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            zIndex: 10,
            border: "1px solid black",
            borderRadius: "4px",
            padding: "8px",
            marginTop: "4px",
            backgroundColor: "white",
          }}
        >
          {sortedUniqueValues.map((option: string, i) => (
            <Fragment key={i}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  style={{
                    marginRight: "8px",
                  }}
                  id={option}
                  name={option}
                  value={option}
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
          ))}
        </div>
      )}
    </div>
  );
  return (
    <div>
      {sortedUniqueValues.map((option: string, i) => {
        return (
          <Fragment key={i}>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                id={option}
                name={option}
                value={option}
                onChange={(e) => {
                  column.setFilterValue(
                    toggle(column.getFilterValue(), e.target.value)
                  );
                }}
              ></input>
              <label
                htmlFor={option}
                className="ml-1.5 font-medium text-gray-700"
              >
                {option}
              </label>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default TableCheckboxFilter;
