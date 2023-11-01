import { Header, Table, flexRender } from "@tanstack/react-table";
import { ColumnsType } from "..";
import styles from "./table-components.module.scss";
import TableFilter from "./table-filter";

export type TableColumnHeaderProps = {
  header: Header<ColumnsType, unknown>;
  table: Table<ColumnsType>;
};
const TableColumnHeader = ({ header, table }: TableColumnHeaderProps) => {
  return (
    <th key={header.id} colSpan={header.colSpan} className={styles.colHeader}>
      {header.isPlaceholder ? null : (
        <div className={styles.content}>
          <div
            className={styles.text}
            onClick={header.column.getToggleSortingHandler()}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
            {header.column.getIsSorted() && (
              <div className={styles.indicator}>
                {
                  {
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted() as string]
                }
              </div>
            )}
          </div>
          {header.column.getCanFilter() ? (
            <TableFilter column={header.column} table={table} />
          ) : null}
        </div>
      )}
    </th>
  );
};

export default TableColumnHeader;
