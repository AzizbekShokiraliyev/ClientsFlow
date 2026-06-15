import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ArrowLeft, Building2, Mail, Phone, User } from "lucide-react"
import { Link } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group"
import { ClientStatusStyles } from "../shared/StyleStatus"
import AddClientDealModal from "./AddClientDealModal"
import type { ClientDeal } from "@/interface/Interface"
import { DeleteDialog } from "../shared/DeleteDialog"

const client = {
  id: "1",
  name: "Azizbek Shokiraliyev",
  email: "aziz@gmail.com",
  phone: "+998931510604",
  company: "GL Solutions",
}

const deals: ClientDeal[] = [
  {
    id: "1",
    title: "Website Redesign",
    status: "In Progress",
    created_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "2",
    title: "SEO Package",
    status: "New",
    created_at: "2026-02-03T00:00:00Z",
  },
  {
    id: "3",
    title: "Mobile App",
    status: "Won",
    created_at: "2026-03-20T00:00:00Z",
  },
]

const ClientDetail = () => {
  return (
    <div className="container mx-auto max-w-4xl p-6">
      <Link
        to="/clients"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Clients
      </Link>

      <Card className="mb-6">
        <CardContent>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold">{client.name}</h2>
          </div>
          <div className="flex gap-4 py-1 text-[15px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              {client.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              {client.phone}
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {client.company}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Deals</CardTitle>
          <AddClientDealModal />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-10 text-center text-sm text-muted-foreground"
                  >
                    No deals yet.
                  </TableCell>
                </TableRow>
              ) : (
                deals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell className="font-medium">{deal.title}</TableCell>
                    <TableCell>
                      <span
                        className={`rounded-md border px-2.5 py-1 text-center text-xs font-medium ${ClientStatusStyles[deal.status]}`}
                      >
                        {deal.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(deal.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex items-center divide-x overflow-hidden rounded-md border">
                        <ButtonGroup>
                          <AddClientDealModal deal={deal} />
                          <ButtonGroupSeparator />
                          <DeleteDialog
                            deleteTitle={`${deal.title}`}
                            onConfirm={() => console.log("Deleted", deal.title)}
                            disabled
                          />
                        </ButtonGroup>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default ClientDetail
