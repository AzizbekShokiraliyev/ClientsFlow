// Clients.tsx
import Search from "../shared/Search"
import ClientsTable from "./ClientsTable"
import ClientModal from "./ClientModal"
import ExportCsvButton from "./ExportCsvButton"
import { useState } from "react"

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState("")

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
          <ClientModal />
          <ExportCsvButton />
        </div>
      </div>
      <ClientsTable searchQuery={searchQuery} />
    </div>
  )
}

export default Clients
