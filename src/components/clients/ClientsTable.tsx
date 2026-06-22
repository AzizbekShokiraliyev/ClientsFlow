import { useNavigate } from "react-router-dom"
import { DeleteDialog } from "../shared/DeleteDialog"
import ClientModal from "./ClientModal"
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group"
import { useClient, useClientDelete } from "@/hooks/useClient"
import type { Client, ColumnDef } from "@/interface/Interface" // sendagi tipga moslab nomla
import { DataTable } from "../shared/DataTable"

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

  const columns: ColumnDef<Client>[] = [
    { header: "Name", render: (c) => c.name },
    { header: "Email", render: (c) => c.email ?? "—" },
    { header: "Phone", render: (c) => c.phone ?? "—" },
    { header: "Company", render: (c) => c.company ?? "—" },
    {
      header: "Date Added",
      render: (c) =>
        new Date(c.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={filtered}
      isLoading={isLoading}
      isError={isError}
      emptyText="No clients found."
      onRowClick={(client) => navigate(`/clients/${client.id}`)}
      renderActions={(client) => (
        <ButtonGroup>
          <ClientModal client={client} />
          <ButtonGroupSeparator />
          <DeleteDialog
            deleteTitle={client.name}
            onConfirm={() => deleteClient(client.id)}
            disabled={deleting}
          />
        </ButtonGroup>
      )}
    />
  )
}

export default ClientsTable
