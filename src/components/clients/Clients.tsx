import Search from "../shared/Search"
import ClientsTable from "./ClientsTable"
import ClientModal from "./ClientModal"
import ExportCsvButton from "./ExportCsvButton"

const Clients = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="w-lg">
          <Search/>
        </div>
        <div className="flex gap-3">
          <ClientModal/>
          <ExportCsvButton/>          
        </div>
      </div>
      <div>
        <ClientsTable/>
      </div>
    </div>
  )
}

export default Clients
