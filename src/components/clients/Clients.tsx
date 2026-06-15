import Search from "../shared/Search"
import ClientsTable from "./ClientsTable"
import ClientModal from "./ClientModal"
import ExportCsvButton from "./ExportCsvButton"
import { useState } from "react"

const Clients = () => {

  const allUser = [
  {
    id: "1",
    user_id: "u1",
    fullName: "Azizbek Shokiraliyev",
    email: "aziz@gmail.com",
    phone: "+998931510604",      
    phoneNumber: "+998931510604",
    company: "GL Solutions",
    created_at: "2024-02-10T00:00:00Z",
    updated_at: "2026-05-10T00:00:00Z",
  },
  {
    id: "2",
    user_id: "u1",
    fullName: "Sobirov Shavkatjon",
    email: "aziz@gmail.com",
    phone: "+998931510604",      
    phoneNumber: "+998931510604",
    company: "GL Solutions",
    created_at: "2024-02-10T00:00:00Z",
    updated_at: "2026-05-10T00:00:00Z",
  },
   {
    id: "3",
    user_id: "u1",
    fullName: "Tojmatov Ilhomjon",
    email: "aziz@gmail.com",
    phone: "+998931510604",      
    phoneNumber: "+998931510604",
    company: "GL Solutions",
    created_at: "2024-02-10T00:00:00Z",
    updated_at: "2026-05-10T00:00:00Z",
  },
  ]
  const [searchQuery, setSearchQuery] = useState<string>("")

  const filteredUser = allUser.filter((client) => (
    client.fullName.toLocaleLowerCase().includes(searchQuery.toLowerCase()) || 
    client.email.toLocaleLowerCase().includes(searchQuery.toLowerCase())
  ))

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-lg">
          <Search value={searchQuery} 
            onChange={(value) => setSearchQuery(value)}/>
        </div>
        <div className="flex gap-3">
          <ClientModal/>
          <ExportCsvButton/>          
        </div>
      </div>
      <div>
        <ClientsTable data={filteredUser}/>
      </div>
    </div>
  )
}

export default Clients
