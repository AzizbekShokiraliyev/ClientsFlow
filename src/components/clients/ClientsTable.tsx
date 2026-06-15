import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useNavigate } from "react-router-dom"
import { DeleteDialog } from "../shared/DeleteDialog"
import ClientModal from "./ClientModal"
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group"
import type { ClientsTableProps } from "@/interface/Interface"

const ClientsTable = ({ data }: ClientsTableProps) => {
  const navigate = useNavigate()

  return (
    <div className="rounded-lg border px-4">
      <Table>
        <TableHeader>
          <TableRow>
                <TableHead>Fullname</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right"><span className="mr-7">Actions</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground" >
                No clients found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((client) => (
              <TableRow key={client.id} onClick={() => navigate(`/clients/${client.id}`)}>
                <TableCell>{client.fullName}</TableCell>
                <TableCell>{client.email ?? "—"}</TableCell>
                <TableCell>{client.phoneNumber ?? "—"}</TableCell>
                <TableCell>{client.company ?? "—"}</TableCell>
                <TableCell>
                  {new Date(client.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-right">
                      <div className="inline-flex items-center rounded-md border divide-x overflow-hidden">
                        <ButtonGroup>
                            <ClientModal client={client} />
                            <ButtonGroupSeparator/>
                            <DeleteDialog deleteTitle={`${client.fullName}`}  onConfirm={() => console.log("Deleted", client.id)}/>
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

export default ClientsTable