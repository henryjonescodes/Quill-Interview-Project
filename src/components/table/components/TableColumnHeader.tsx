import { Header, Table, flexRender } from "@tanstack/react-table";
import React from "react";
import TableFilter from "./TableFilter";

export type TableColumnHeaderProps = {
  header: Header<any, unknown>;
  table: Table<any>;
};

const TableColumnHeader = ({
  header,
  table,
}: TableColumnHeaderProps): React.ReactElement<TableColumnHeaderProps> => {
  return (
    <th key={header.id} colSpan={header.colSpan}>
      {header.isPlaceholder ? null : (
        <>
          <div
            {...{
              className: header.column.getCanSort()
                ? "cursor-pointer select-none"
                : "",
              onClick: header.column.getToggleSortingHandler(),
            }}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
            {{
              asc: " 🔼",
              desc: " 🔽",
            }[header.column.getIsSorted() as string] ?? null}
          </div>
          {header.column.getCanFilter() ? (
            <div>
              <TableFilter column={header.column} table={table} />
            </div>
          ) : null}
        </>
      )}
    </th>
  );
};

export default TableColumnHeader;
