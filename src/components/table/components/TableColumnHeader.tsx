import { Header, Table, flexRender } from "@tanstack/react-table";
import React from "react";
import TableFilter from "./table-filter";
import styles from "./../table.module.css";
import cn from "classnames";
import TableCheckboxFilter from "./table-filter/TableCheckboxFilter";
export type TableColumnHeaderProps = {
  header: Header<any, unknown>;
  table: Table<any>;
};

const TableColumnHeader = ({
  header,
  table,
}: TableColumnHeaderProps): React.ReactElement<TableColumnHeaderProps> => {
  return (
    <th key={header.id} colSpan={header.colSpan} className={styles.colHeader}>
      {header.isPlaceholder ? null : (
        <div className={styles.colHeaderContent}>
          <div
            className={cn({
              [styles.colHeaderTextClickable]: header.column.getCanSort(),
              [styles.colHeaderText]: true,
            })}
            onClick={header.column.getToggleSortingHandler()}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
            {{
              asc: " 🔼",
              desc: " 🔽",
            }[header.column.getIsSorted() as string] ?? null}
          </div>
          {header.column.getCanFilter() ? (
            <div className={styles.colHeaderFilter}>
              <TableFilter column={header.column} table={table} />
            </div>
          ) : null}
        </div>
      )}
    </th>
  );
};

export default TableColumnHeader;
