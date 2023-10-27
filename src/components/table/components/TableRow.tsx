import { Row, flexRender } from "@tanstack/react-table";
import styles from "./table-components.module.scss";

export type TableRowProps = {
  row: Row<any>;
};
const TableRow = ({ row }: TableRowProps) => {
  return (
    <tr key={row.id} className={styles.row}>
      {row.getVisibleCells().map((cell) => {
        if (cell.getValue() instanceof Date) {
          const _date = cell.getValue() as Date;
          return <td key={cell.id}>{_date.toLocaleDateString()}</td>;
        }
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
