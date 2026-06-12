import Search from "../shared/Search"
import DealModal from "./DealModal"
import DealTable from "./DealTable"

const Deals = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="w-lg">
          <Search/>
        </div>
        <div className="flex gap-3">
          <DealModal/>          
        </div>
      </div>
      <DealTable/>
    </div>
  )
}

export default Deals
