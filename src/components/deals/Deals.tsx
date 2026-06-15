import DealModal from "./DealModal"
import DealTable from "./DealTable"
import { UseDeal } from "@/hooks/useDeal"

const Deals = () => {
  const { data: deals } = UseDeal()

  return (
    <div>
      <div className="flex justify-between mb-5">
        <div className="w-lg">
          Deals: {deals?.length ?? 0}
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