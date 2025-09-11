"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, Plus, RefreshCw } from "lucide-react";

export interface DataTableFilter {
  columnId: string;
  placeholder: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export interface DataTablePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (limit: number) => void;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  title?: string;
  searchableColumns?: DataTableFilter[];
  onAddNew?: () => void;
  onRefresh?: () => void;
  addButtonLabel?: string;
  emptyMessage?: string;
  pagination?: DataTablePagination;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  title,
  searchableColumns = [],
  onAddNew,
  onRefresh,
  addButtonLabel = "Adicionar",
  emptyMessage = "Nenhum resultado encontrado.",
  pagination,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: pagination ? undefined : getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: !!pagination,
    pageCount: pagination?.totalPages ?? -1,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: pagination ? {
        pageIndex: pagination.page - 1,
        pageSize: pagination.limit,
      } : undefined,
    },
  });

  return (
    <div className="space-y-4">
      {/* Header com título e ações */}
      {(title || onAddNew || onRefresh) && (
        <div className="flex items-center justify-between">
          {title && <h2 className="text-2xl font-bold tracking-tight">{title}</h2>}
          <div className="flex items-center space-x-2">
            {onRefresh && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              </Button>
            )}
            {onAddNew && (
              <Button onClick={onAddNew} disabled={isLoading}>
                <Plus className="h-4 w-4 mr-2" />
                {addButtonLabel}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Controles da tabela */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Filtros de busca */}
          {searchableColumns.map((filter) => (
            <div key={filter.columnId} className="flex flex-col space-y-1">
              {filter.label && (
                <label className="text-sm font-medium">{filter.label}</label>
              )}
              <Input
                placeholder={filter.placeholder}
                value={filter.value ?? (table.getColumn(filter.columnId)?.getFilterValue() as string) ?? ""}
                onChange={(event) => {
                  const value = event.target.value;
                  table.getColumn(filter.columnId)?.setFilterValue(value);
                  filter.onChange?.(value);
                }}
                className="max-w-sm"
                disabled={isLoading}
              />
            </div>
          ))}
        </div>

        {/* Seletor de colunas */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabela */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Carregando...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginação e informações */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          {pagination 
            ? `Mostrando ${(pagination.page - 1) * pagination.limit + 1} a ${Math.min(pagination.page * pagination.limit, pagination.total)} de ${pagination.total} resultados`
            : `${table.getFilteredSelectedRowModel().rows.length} de ${table.getFilteredRowModel().rows.length} linha(s) selecionada(s).`
          }
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Linhas por página</p>
            <select
              className="h-8 w-[70px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              value={pagination?.limit ?? table.getState().pagination.pageSize}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                if (pagination) {
                  pagination.onPageSizeChange(newSize);
                } else {
                  table.setPageSize(newSize);
                }
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Página {pagination?.page ?? (table.getState().pagination.pageIndex + 1)} de{" "}
            {pagination?.totalPages ?? table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {
                if (pagination) {
                  pagination.onPageChange(1);
                } else {
                  table.setPageIndex(0);
                }
              }}
              disabled={pagination ? !pagination.hasPrevPage : !table.getCanPreviousPage()}
            >
              <span className="sr-only">Ir para primeira página</span>
              {"<<"}
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                if (pagination) {
                  pagination.onPageChange(pagination.page - 1);
                } else {
                  table.previousPage();
                }
              }}
              disabled={pagination ? !pagination.hasPrevPage : !table.getCanPreviousPage()}
            >
              <span className="sr-only">Ir para página anterior</span>
              {"<"}
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                if (pagination) {
                  pagination.onPageChange(pagination.page + 1);
                } else {
                  table.nextPage();
                }
              }}
              disabled={pagination ? !pagination.hasNextPage : !table.getCanNextPage()}
            >
              <span className="sr-only">Ir para próxima página</span>
              {">"}
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {
                if (pagination) {
                  pagination.onPageChange(pagination.totalPages);
                } else {
                  table.setPageIndex(table.getPageCount() - 1);
                }
              }}
              disabled={pagination ? !pagination.hasNextPage : !table.getCanNextPage()}
            >
              <span className="sr-only">Ir para última página</span>
              {">>"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
