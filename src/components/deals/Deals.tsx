import DealModal from "./DealModal"
import DealTable from "./DealTable"

const Deals = () => {
  return (
    <div>
      <div className="flex justify-between mb-5">
        <div className="w-lg">
          Tasks N
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
