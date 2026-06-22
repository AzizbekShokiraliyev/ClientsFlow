import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Card } from "../ui/card"
import { cn } from "@/lib/utils"
import type { DataTableProps } from "@/interface/Interface"

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  isLoading,
  isError,
  loadingText = "Loading...",
  errorText = "An error occurred, please refresh the page.",
  emptyText = "No data found.",
  onRowClick,
  renderActions,
  actionsHeader = "Actions",
}: DataTableProps<T>) {
  if (isLoading) return <div className="p-10 text-center">{loadingText}</div>
  if (isError)
    return <div className="p-10 text-center text-red-500">{errorText}</div>

  const rows = data ?? []
  const colSpan = columns.length + (renderActions ? 1 : 0)

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, i) => (
              <TableHead key={i} className={col.className}>
                {col.header}
              </TableHead>
            ))}
            {renderActions && (
              <TableHead className="text-right">
                <span className="mr-3">{actionsHeader}</span>
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={colSpan}
                className="py-10 text-center text-sm text-muted-foreground"
              >
                {emptyText}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(onRowClick && "group cursor-pointer")}
              >
                {columns.map((col, i) => (
                  <TableCell key={i} className={col.cellClassName}>
                    {col.render(row)}
                  </TableCell>
                ))}
                {renderActions && (
                  <TableCell
                    className="text-right"
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <div className="inline-flex items-center divide-x overflow-hidden rounded-md border bg-background shadow-sm">
                      {renderActions(row)}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
