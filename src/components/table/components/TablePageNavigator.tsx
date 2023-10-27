import { Table } from "@tanstack/react-table";
import React from "react";
import styles from "./../table.module.css";
import TableInput from "./TableInput";
import { Entry } from "..";

type Props = {
  table: Table<Entry>;
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
      <div className={styles.navButtons}>
        <span>
          <button
            className={styles.navButton}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className={styles.navButton}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
        </span>
        <span className={styles.navPageNumber}>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>

        <span>
          <button
            className={styles.navButton}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className={styles.navButton}
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
        className={styles.navSearch}
        value={globalFilter ?? ""}
        onChange={(value) => setGlobalFilter(String(value))}
        placeholder="Search all columns..."
      />
    </div>
  );
};

export default TablePageNavigator;
