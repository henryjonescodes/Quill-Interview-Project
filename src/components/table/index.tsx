import React from "react";

import {
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { RankingInfo } from "@tanstack/match-sorter-utils";
import { Entry } from "../../pages/Home";
import TableFilter from "./components/TableFilter";
import TableInput from "./components/TableInput";
import TablePageNavigator from "./components/TablePageNavigator";
import { fuzzyFilter } from "./utils";
import TableColumnHeader, {
  TableColumnHeaderProps,
} from "./components/TableColumnHeader";
import TableRow, { TableRowProps } from "./components/TableRow";
import TableContainer, {
  TableContainerProps,
} from "./components/TableContainer";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

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

  HeaderComponent?: React.ComponentType<TableColumnHeaderProps>;
  RowComponent?: React.ComponentType<TableRowProps>;
  ContainerComponent?: React.ComponentType<TableContainerProps>;
}

const TableView = ({
  fields,
  data,
  HeaderComponent = TableColumnHeader,
  RowComponent = TableRow,
  ContainerComponent = TableContainer,
}: TableProps) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

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
      // @ts-ignore // TODO: remove and fix
      footer: (props) => props.column.id,
      // filterFn: "fuzzy",
      // sortingFn: fuzzySort,
    }));

    return [
      {
        header: "Table",
        // @ts-ignore // TODO: remove and fix
        footer: (props) => props.column.id,
        columns: generatedColumns,
      },
    ];
  }, [fields]);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  const content = (
    <>
      <div>
        <TableInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="p-2 font-lg shadow border border-block"
          placeholder="Search all columns..."
        />
      </div>
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                // ? Custom header component
                if (!!HeaderComponent) {
                  return <HeaderComponent header={header} table={table} />;
                }
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
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            // ? Custom row component
            if (!!RowComponent) {
              return <RowComponent row={row} />;
            }
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
      <TablePageNavigator table={table} />
    </>
  );
  if (!!ContainerComponent) {
    return <ContainerComponent>{content}</ContainerComponent>;
  }
  return <div className="p-2">{content}</div>;
};

export default TableView;
