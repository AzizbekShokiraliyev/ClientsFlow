import Search from "../shared/Search"
import ClientsTable from "./ClientsTable"
import ClientModal from "./ClientModal"
import ExportCsvButton from "./ExportCsvButton"
import { useState } from "react"
import { useClient } from "@/hooks/useClient"

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const { data: client } = useClient()

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="w-lg">
          <Search
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
            placeholder="Search clients..."
          />
        </div>
        <div className="flex gap-3">
          <ExportCsvButton
            data={client ?? []}
            filename="clients"
            headers={["Name", "Email", "Phone", "Company", "Date Added"]}
            keys={["name", "email", "phone", "company", "created_at"]}
          />
          <ClientModal />
        </div>
      </div>
      <ClientsTable searchQuery={searchQuery} />
    </div>
  )
}

export default Clients
