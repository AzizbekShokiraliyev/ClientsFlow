import { Download } from "lucide-react"
import { Button } from "../ui/button"
import type { ExportCsvButtonProps } from "@/interface/Interface"

const ExportCsvButton = ({
  data,
  filename = "export",
  headers,
  keys,
}: ExportCsvButtonProps) => {
  const handleExport = () => {
    const rows = data.map((item) => keys.map((key) => item[key] ?? "—"))
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${filename}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button
      size="lg"
      variant="outline"
      onClick={handleExport}
      disabled={data.length === 0}
    >
      <Download />
      Export CSV
    </Button>
  )
}

export default ExportCsvButton
