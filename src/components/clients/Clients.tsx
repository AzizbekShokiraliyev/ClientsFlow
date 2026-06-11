import { Download } from "lucide-react"
import Search from "../shared/Search"
import { Button } from "../ui/button"
import ClientsTable from "./ClientsTable"
import ClientModal from "./modals/ClientModal"

const Clients = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="w-lg">
          <Search/>
        </div>
        <div className="flex gap-3">
          <ClientModal/>
          <Button size="lg" variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
           Export CSV
          </Button>
        </div>
      </div>
      <div>
        <ClientsTable/>
      </div>
    </div>
  )
}

export default Clients
