import { Table } from "@tanstack/react-table";
import React from "react";
import styles from "./table-components.module.scss";
import TableInput from "./TableInput";
import { ColumnsType } from "..";

type Props = {
  table: Table<ColumnsType>;
  globalFilter: string | undefined;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const TablePageNavigator = ({
  table,
  globalFilter,
  setGlobalFilter,
}: Props) => {
  return (
    <div className={styles.nav}>
      <div className={styles.buttons}>
        <span>
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
        </span>
        <span className={styles.number}>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>

        <span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </span>

        {/* <span className={styles.navFooter}>
        | Go to page:
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className="border p-1 rounded w-16"
        />
      </span>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
      <div>{table.getPrePaginationRowModel().rows.length} Rows</div> */}
      </div>
      <TableInput
        className={styles.search}
        value={globalFilter ?? ""}
        onChange={(value) => setGlobalFilter(String(value))}
        placeholder="Search all columns..."
      />
    </div>
  );
};

export default TablePageNavigator;
