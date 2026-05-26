import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type TableOptions,
  type VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/shared/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DataTableProps<TData> {
  /** Column definitions — build with `columnHelper` or plain `ColumnDef[]`. */
  readonly columns: ColumnDef<TData, unknown>[];
  readonly data: TData[];

  // ── State (controlled) ──────────────────────────────────────────────
  readonly sorting?: SortingState;
  readonly onSortingChange?: React.Dispatch<React.SetStateAction<SortingState>>;

  readonly columnFilters?: ColumnFiltersState;
  readonly onColumnFiltersChange?: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;

  readonly columnVisibility?: VisibilityState;
  readonly onColumnVisibilityChange?: React.Dispatch<React.SetStateAction<VisibilityState>>;

  readonly rowSelection?: RowSelectionState;
  readonly onRowSelectionChange?: React.Dispatch<React.SetStateAction<RowSelectionState>>;

  readonly pagination?: PaginationState;
  readonly onPaginationChange?: React.Dispatch<React.SetStateAction<PaginationState>>;

  // ── Features ────────────────────────────────────────────────────────
  /** Enable client-side sorting. Default true. */
  readonly enableSorting?: boolean;
  /** Enable client-side pagination. Default true. */
  readonly enablePagination?: boolean;
  /** Page size options shown in the footer. Default [10, 20, 50]. */
  readonly pageSizeOptions?: number[];
  /** Total row count when using server-side pagination. */
  readonly rowCount?: number;

  // ── Display ─────────────────────────────────────────────────────────
  readonly isLoading?: boolean;
  /** Content shown when data is empty. */
  readonly emptyState?: React.ReactNode;
  /** Toolbar rendered above the table (filters, search, action buttons). */
  readonly toolbar?: React.ReactNode;
  /** Caption rendered below the table. */
  readonly caption?: React.ReactNode;

  // ── Styling ─────────────────────────────────────────────────────────
  readonly className?: string;
  readonly tableClassName?: string;
  /** Extra options forwarded directly to `useReactTable`. */
  readonly tableOptions?: Partial<TableOptions<TData>>;
}

// ─── Sort icon ────────────────────────────────────────────────────────────────

function SortIcon({ sorted }: { readonly sorted: false | "asc" | "desc" }) {
  if (sorted === "asc") return <ChevronUp className="ml-1.5 h-3.5 w-3.5 shrink-0" />;
  if (sorted === "desc") return <ChevronDown className="ml-1.5 h-3.5 w-3.5 shrink-0" />;
  return <ChevronsUpDown className="ml-1.5 h-3.5 w-3.5 shrink-0 opacity-40" />;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DataTable<TData>({
  columns,
  data,

  sorting: sortingProp,
  onSortingChange,

  columnFilters: columnFiltersProp,
  onColumnFiltersChange,

  columnVisibility: columnVisibilityProp,
  onColumnVisibilityChange,

  rowSelection: rowSelectionProp,
  onRowSelectionChange,

  pagination: paginationProp,
  onPaginationChange,

  enableSorting = true,
  enablePagination = true,
  pageSizeOptions = [10, 20, 50],
  rowCount,

  isLoading = false,
  emptyState,
  toolbar,
  caption,

  className,
  tableClassName,
  tableOptions,
}: DataTableProps<TData>) {
  // Internal fallback state (uncontrolled)
  const [sortingInternal, setSortingInternal] = React.useState<SortingState>([]);
  const [columnFiltersInternal, setColumnFiltersInternal] = React.useState<ColumnFiltersState>([]);
  const [columnVisibilityInternal, setColumnVisibilityInternal] = React.useState<VisibilityState>({});
  const [rowSelectionInternal, setRowSelectionInternal] = React.useState<RowSelectionState>({});
  const [paginationInternal, setPaginationInternal] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSizeOptions[0] ?? 10,
  });

  const table = useReactTable<TData>({
    data,
    columns,
    rowCount,
    getCoreRowModel: getCoreRowModel(),
    ...(enableSorting && { getSortedRowModel: getSortedRowModel() }),
    ...(enablePagination && { getPaginationRowModel: getPaginationRowModel() }),
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting: sortingProp ?? sortingInternal,
      columnFilters: columnFiltersProp ?? columnFiltersInternal,
      columnVisibility: columnVisibilityProp ?? columnVisibilityInternal,
      rowSelection: rowSelectionProp ?? rowSelectionInternal,
      pagination: paginationProp ?? paginationInternal,
    },

    onSortingChange: onSortingChange ?? setSortingInternal,
    onColumnFiltersChange: onColumnFiltersChange ?? setColumnFiltersInternal,
    onColumnVisibilityChange: onColumnVisibilityChange ?? setColumnVisibilityInternal,
    onRowSelectionChange: onRowSelectionChange ?? setRowSelectionInternal,
    onPaginationChange: onPaginationChange ?? setPaginationInternal,

    ...tableOptions,
  });

  const rows = table.getRowModel().rows;

  let bodyContent: React.ReactNode;
  if (isLoading) {
    bodyContent = (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-32 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
            Loading…
          </div>
        </TableCell>
      </TableRow>
    );
  } else if (rows.length === 0) {
    bodyContent = (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground">
          {emptyState ?? "No results."}
        </TableCell>
      </TableRow>
    );
  } else {
    bodyContent = rows.map((row) => (
      <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ));
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Toolbar slot */}
      {toolbar && <div>{toolbar}</div>}

      {/* Table */}
      <div className="rounded-lg border bg-card overflow-hidden">
        <Table className={tableClassName}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const canSort = enableSorting && header.column.getCanSort();
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <button
                          type="button"
                          className={cn(
                            "flex items-center select-none bg-transparent border-0 p-0 text-inherit font-inherit text-left",
                            canSort ? "cursor-pointer" : "cursor-default pointer-events-none"
                          )}
                          onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                          aria-label={canSort ? `Sort by ${String(header.column.columnDef.header)}` : undefined}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort && (
                            <SortIcon sorted={header.column.getIsSorted()} />
                          )}
                        </button>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {bodyContent}
          </TableBody>
        </Table>
      </div>

      {/* Caption */}
      {caption && <p className="text-sm text-muted-foreground">{caption}</p>}

      {/* Pagination */}
      {enablePagination && (
        <div className="flex items-center justify-between gap-4 px-1 text-sm text-muted-foreground">
          {/* Selection count */}
          <span className="shrink-0">
            {Object.keys(table.getState().rowSelection).length > 0
              ? `${Object.keys(table.getState().rowSelection).length} of ${table.getFilteredRowModel().rows.length} row(s) selected`
              : `${table.getFilteredRowModel().rows.length} row(s)`}
          </span>

          <div className="flex items-center gap-4">
            {/* Page size */}
            <div className="flex items-center gap-1.5">
              <span className="shrink-0">Rows per page</span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                className="h-8 rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            {/* Page info */}
            <span className="shrink-0">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>

            {/* Navigation */}
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
