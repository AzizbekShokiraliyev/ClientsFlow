import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { DeleteDialog } from '../shared/DeleteDialog'
import { cn } from '@/lib/utils'
import DealModal from './DealModal'
import { ButtonGroup, ButtonGroupSeparator } from '../ui/button-group'
import { UseDeal, useDealDelate } from '@/hooks/useDeal'


const DealTable = () => {
  const {data: deals, isLoading, isError} = UseDeal()
  const {mutate: deleteDeal, isPending: deleting} = useDealDelate()

  if (isLoading) return <div className="p-10 text-center">Loading deals...</div>
  if (isError) return <div className="p-10 text-center text-red-500">An error occurred, please refresh the page.</div>


  return (
    <div className="rounded-lg border px-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date added</TableHead>
            <TableHead>Date updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(deals ?? []).length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                No deals found.
              </TableCell>
            </TableRow>
          ) : (
            (deals ?? []).map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <span className={cn("text-xs font-medium px-2.5 py-1 rounded-md border w-[5vw] text-center", [item.status])}>
                    {item.status}
                  </span>
                </TableCell>
                <TableCell>
                  {item.created_at
                    ? new Date(item.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "—"}
                </TableCell>
                <TableCell>
                  {item.updated_at
                    ? new Date(item.updated_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "—"}
                </TableCell>
                <TableCell className="text-right">
                      <div className="inline-flex items-center rounded-md border divide-x overflow-hidden">
                        <ButtonGroup>
                            <DealModal deal={item} />
                            <ButtonGroupSeparator/>
                            <DeleteDialog deleteTitle={`${item.title}`} onConfirm={() => deleteDeal(item.id)} disabled={deleting}/>
                        </ButtonGroup>
                      </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
export default DealTable