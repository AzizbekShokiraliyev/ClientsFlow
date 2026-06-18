import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../ui/card"
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  User,
  Briefcase,
} from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table"
import { ButtonGroup, ButtonGroupSeparator } from "../../ui/button-group"
import AddClientDealModal from "./AddClientDealModal"
import { DeleteDialog } from "../../shared/DeleteDialog"
import { useDealById, useDealDelete } from "@/hooks/useDeal"
import { cn } from "@/lib/utils"
import type { ClientDealStatus } from "@/interface/Interface"
import { ClientStatusStyles } from "@/components/shared/StyleStatus"
import { useClientById } from "@/hooks/useClient"

const ClientDetail = () => {
  const navigate = useNavigate()
  const { clientId } = useParams()
  const { isLoading, isError, data: deals } = useDealById(clientId)
  const { mutate: dealDelete, isPending: deleting } = useDealDelete()
  const { data: client } = useClientById(clientId)

  if (isLoading) return <div className="p-10 text-center">Loading deals...</div>
  if (isError)
    return (
      <div className="p-10 text-center text-red-500">
        An error occurred, please refresh the page.
      </div>
    )

  return (
    <div className="w-full space-y-6">
      <div>
        <Link
          to="/clients"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Clients
        </Link>
      </div>

      <Card className="w-full overflow-hidden border-muted/60 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 border-b border-muted/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  {client?.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Client Profile & Contact Information
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm">
              <div className="rounded-md bg-muted p-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-muted-foreground">
                  Email Address
                </p>
                <p className="truncate text-sm font-medium text-foreground">
                  {client?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm">
              <div className="rounded-md bg-muted p-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-muted-foreground">
                  Phone Number
                </p>
                <p className="truncate text-sm font-medium text-foreground">
                  {client?.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm">
              <div className="rounded-md bg-muted p-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-muted-foreground">
                  Company
                </p>
                <p className="truncate text-sm font-medium text-foreground">
                  {client?.company}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="space-y-1">
              <CardTitle>
                <div className="flex items-center gap-2 text-lg font-bold tracking-tight">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  Deals Pipeline
                </div>
              </CardTitle>
              <CardDescription>
                Manage deals and revenue tracking for this client
              </CardDescription>
            </div>
            <AddClientDealModal />
          </div>
        </CardHeader>
        <CardContent>
          <div>
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
                {(deals ?? []).length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="py-12 text-center text-sm text-muted-foreground"
                    >
                      No active deals found for this client.
                    </TableCell>
                  </TableRow>
                ) : (
                  (deals ?? []).map((deal) => (
                    <TableRow
                      key={deal.id}
                      onClick={() =>
                        navigate(`/clients/${clientId}/deals/${deal.id}`)
                      }
                      className="group cursor-pointer transition-colors hover:bg-muted/50"
                    >
                      <TableCell className="font-semibold text-foreground transition-colors group-hover:text-primary">
                        {deal.title}
                      </TableCell>

                      <TableCell>
                        <span
                          className={cn(
                            "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-center text-xs font-medium",
                            ClientStatusStyles[deal.status as ClientDealStatus]
                          )}
                        >
                          {deal.status}
                        </span>
                      </TableCell>

                      <TableCell className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          {new Date(deal.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </TableCell>

                      <TableCell
                        className="text-right"
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        <div className="inline-flex items-center divide-x overflow-hidden rounded-md border bg-background shadow-sm">
                          <ButtonGroup>
                            <AddClientDealModal deal={deal} />
                            <ButtonGroupSeparator />
                            <DeleteDialog
                              deleteTitle={`${deal.title}`}
                              onConfirm={() => dealDelete(deal.id)}
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ClientDetail
