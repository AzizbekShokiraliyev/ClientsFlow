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
import { ButtonGroup, ButtonGroupSeparator } from "../../ui/button-group"
import AddClientDealModal from "./AddClientDealModal"
import { DeleteDialog } from "../../shared/DeleteDialog"
import { useDealById, useDealDelete } from "@/hooks/useDeal"
import { cn } from "@/lib/utils"
import type { ClientDealStatus, ColumnDef, Deal } from "@/interface/Interface"
import { ClientStatusStyles } from "@/components/shared/StyleStatus"
import { useClientById } from "@/hooks/useClient"
import { DataTable } from "@/components/shared/DataTable"

const ClientDetail = () => {
  const navigate = useNavigate()
  const { clientId } = useParams()
  const { isLoading, isError, data: deals } = useDealById(clientId)
  const { mutate: dealDelete, isPending: deleting } = useDealDelete()
  const { data: client } = useClientById(clientId)

  const columns: ColumnDef<Deal>[] = [
    {
      header: "Deal Title",
      render: (deal) => deal.title,
    },
    {
      header: "Status",
      render: (deal) => (
        <span
          className={cn(ClientStatusStyles[deal.status as ClientDealStatus])}
        >
          {deal.status}
        </span>
      ),
    },
    {
      header: "Created Date",
      render: (deal) => (
        <div>
          {new Date(deal.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      ),
    },
  ]

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
        <DataTable
          columns={columns}
          data={deals}
          isLoading={isLoading}
          isError={isError}
          loadingText="Loading deals..."
          emptyText="No active deals found for this client."
          onRowClick={(deal) =>
            navigate(`/clients/${clientId}/deals/${deal.id}`)
          }
          renderActions={(deal) => (
            <ButtonGroup>
              <AddClientDealModal deal={deal} />
              <ButtonGroupSeparator />
              <DeleteDialog
                deleteTitle={`${deal.title}`}
                onConfirm={() => dealDelete(deal.id)}
                disabled={deleting}
              />
            </ButtonGroup>
          )}
        />
      </CardContent>
    </div>
  )
}

export default ClientDetail
