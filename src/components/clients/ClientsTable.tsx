import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import type { Client } from "@/interface/Interface"
import { useNavigate } from "react-router-dom"
import { DeleteDialog } from "../shared/DeleteDialog"
import ClientModal from "./ClientModal"

const user: Client[] = [
  {
    id: "1",
    user_id: "u1",
    fullName: "Azizbek Shokiraliyev",
    email: "aziz@gmail.com",
    phoneNumber: "+998931510604",
    company: "GL Solutions",
    created_at: "2024-02-10T00:00:00Z",
    updated_at: "2026-05-10T00:00:00Z",
  },
]

const ClientsTable = () => {
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
          {user.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground" >
                No clients found.
              </TableCell>
            </TableRow>
          ) : (
            user.map((client) => (
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
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="inline-flex items-center">
                    <div className="flex items-center">
                        <ClientModal client={client} />
                        <DeleteDialog deleteTitle={`${client.fullName}`}  onConfirm={() => console.log("Deleted", client.id)}/>
                    </div>
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