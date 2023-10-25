import { Row, flexRender } from "@tanstack/react-table";
import React from "react";

export type TableRowProps = {
  row: Row<any>;
};
const TableRow = ({ row }: TableRowProps) => {
  return (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell) => {
        return (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
