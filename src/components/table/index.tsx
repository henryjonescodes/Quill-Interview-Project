import React from "react";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Entry } from "../../pages/Home";
export interface Field {
  name: string;
  label: string;
  jsType: "date" | "string" | "number";
}

interface TableProps {
  title?: string;
  data: Entry[];
  fields: Field[];
  // dateField: string; // ! wtf is this?

  headerComponent?: React.ReactNode;
  rowComponent?: React.ReactNode;
  ContainerComponent?: React.ComponentType<{ children: React.ReactNode }>;
}

// const WrapperComponent = ({ children }: { children: React.ReactNode }) => {
//   return <div className="wrapper">{children}</div>;
// };

const Table = ({ fields, data }: TableProps) => {
  const rerender = React.useReducer(() => ({}), {})[1];

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo(() => {
    const createAccessor = (field: Field) => {
      switch (field.jsType) {
        case "date":
          return (row: any) => new Date(row[field.name]).toLocaleDateString();
        case "number":
          return (row: any) => Number(row[field.name]);
        case "string":
        default:
          return (row: any) => String(row[field.name]);
      }
    };

    const generatedColumns = fields.map((field) => ({
      accessorFn: createAccessor(field),
      id: field.name,
      header: () => <span>{field.label}</span>,
      footer: (props) => props.column.id,
    }));

    return [
      {
        header: "Table",
        footer: (props) => props.column.id,
        columns: generatedColumns,
      },
    ];
  }, [fields]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
