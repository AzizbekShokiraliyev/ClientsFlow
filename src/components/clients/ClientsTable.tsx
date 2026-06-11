import { Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import type { Client } from "@/interface/Interface"
import { Link } from "react-router-dom"
import { DeleteDialog } from "./modals/DeleteClientDialog"
import ClientModal from "./modals/ClientModal"

const user: Client[] = [
  {
    id: "1",
    user_id: "u1",
    firstName: "Aziz",
    lastName: "Shokiraliyev",
    email: "aziz@gmail.com",
    phoneNumber: "+998931510604",
    company: "GL Solutions",
    created_at: "2024-02-10T00:00:00Z",
    updated_at: "2026-05-10T00:00:00Z",
  },
]

const ClientsTable = () => {

  return (
    <div className="rounded-lg border px-4">
      <Table>
        <TableHeader>
          <TableRow>
                <TableHead>FirstName</TableHead>
                <TableHead>LastName</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">
                    <span className="mr-7">Actions</span>
                </TableHead>
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
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.firstName}</TableCell>
                <TableCell className="font-medium">{client.lastName}</TableCell>
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
                  <div className="inline-flex items-center">
                    <ButtonGroup>
                        <Button variant="secondary" size="icon">
                            <Link to={`/clients/${client.id}`}>
                                <Eye className="h-4 w-4" />
                            </Link>
                        </Button>
                        <ClientModal client={client} />
                        <DeleteDialog clientName={`${client.firstName} ${client.lastName}`}  onConfirm={() => console.log("Deleted", client.id)}/>
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