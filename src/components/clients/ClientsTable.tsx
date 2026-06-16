// ClientsTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { useNavigate } from "react-router-dom"
import { DeleteDialog } from "../shared/DeleteDialog"
import ClientModal from "./ClientModal"
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group"
import { useClient, useClientDelete } from "@/hooks/useClient"
import { Card } from "../ui/card"

interface ClientsTableProps {
  searchQuery: string
}

const ClientsTable = ({ searchQuery }: ClientsTableProps) => {
  const navigate = useNavigate()
  const { isLoading, isError, data: clients } = useClient()
  const { mutate: deleteClient, isPending: deleting } = useClientDelete()

  const filtered = (clients ?? []).filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading)
    return <div className="p-10 text-center">Loading clients...</div>
  if (isError)
    return (
      <div className="p-10 text-center text-red-500">
        An error occurred, please refresh the page.
      </div>
    )

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead className="text-right">
              <span className="mr-3">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-10 text-center text-sm text-muted-foreground"
              >
                No clients found.
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((client) => (
              <TableRow
                key={client.id}
                onClick={() => navigate(`/clients/${client.id}`)}
                className="cursor-pointer"
              >
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email ?? "—"}</TableCell>
                <TableCell>{client.phone ?? "—"}</TableCell>
                <TableCell>{client.company ?? "—"}</TableCell>
                <TableCell>
                  {new Date(client.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell
                  className="text-right"
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div className="inline-flex items-center divide-x overflow-hidden rounded-md border">
                    <ButtonGroup>
                      <ClientModal client={client} />
                      <ButtonGroupSeparator />
                      <DeleteDialog
                        deleteTitle={client.name}
                        onConfirm={() => deleteClient(client.id)}
                        disabled={deleting}
                      />
                    </ButtonGroup>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  )
}

export default ClientsTable
