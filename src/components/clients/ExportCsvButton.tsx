import { Download } from 'lucide-react'
import { Button } from '../ui/button'

const ExportCsvButton = () => {
  return (
    <div>
      <Button size="lg" variant="outline" className="flex items-center gap-2">
        <Download className="h-4 w-4" />Export CSV
      </Button>
    </div>
  )
}

export default ExportCsvButton
