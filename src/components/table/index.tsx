import React, { useEffect, useState } from "react";

import {
  ColumnDef,
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
import TableColumnHeader, {
  TableColumnHeaderProps,
} from "./components/TableColumnHeader";
import TableContainer, {
  TableContainerProps,
} from "./components/TableContainer";
import TablePageNavigator from "./components/TablePageNavigator";
import TableRow, { TableRowProps } from "./components/TableRow";
import TableFilter from "./components/table-filter";
import styles from "./table.module.css";
import {
  dateRangeFilter,
  dateRangeSort,
  fuzzyFilter,
  fuzzySort,
  multipleFilter,
} from "./utils";

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

export type Entry = {
  id: string;
  dateModified: Date;
  dateCreated: Date;
  assignee?: string;
  storyPoints?: number;
};

type ColumnType = ColumnDef<Entry>;

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
  title = "Quill Table Demo",
}: TableProps) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string | undefined>("");

  useEffect(() => {
    console.log("Filters\n", columnFilters, globalFilter);
  }, [columnFilters, globalFilter]);

  const columns: ColumnType[] = React.useMemo(() => {
    const optionsForField = (field: Field) => {
      switch (field.jsType) {
        case "date":
          return {
            sortingFn: dateRangeSort,
            filterFn: dateRangeFilter,
            // accessorKey: new Date(field.name),
            // flexRender: (row: any) => {
            //   new Date(row[field.name]).toLocaleDateString();
            // },
            accessorFn: (row: any) => new Date(row[field.name]),
          };
        case "number":
          return {
            sortingFn: fuzzySort,
            accessorFn: (row: any) => Number(row[field.name]),
          };
        case "string":
        default:
          return {
            sortingFn: fuzzySort,
            filterFn: multipleFilter,
            accessorFn: (row: any) => String(row[field.name]),
          };
      }
    };

    const generatedColumns = fields.map((field) => ({
      id: field.name,
      header: () => <span>{field.label}</span>,
      footer: (props) => props.column.id,
      ...optionsForField(field),
    }));

    return [
      {
        header: title,
        footer: (props) => props.column.id,
        columns: generatedColumns,
      },
    ];
  }, [fields]);

  const table = useReactTable({
    data: data as Entry[],
    columns: columns as ColumnType[],
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: false,
  });

  const content = (
    <>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                // ? Custom header component
                if (!!HeaderComponent) {
                  return (
                    <HeaderComponent
                      key={header.id}
                      header={header}
                      table={table}
                    />
                  );
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
              return <RowComponent key={row.id} row={row} />;
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
      <TablePageNavigator
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </>
  );
  if (!!ContainerComponent) {
    return <ContainerComponent>{content}</ContainerComponent>;
  }
  return <div className={styles.container}>{content}</div>;
};

export default TableView;
