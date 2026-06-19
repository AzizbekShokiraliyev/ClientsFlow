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
    const rows = data.map((item) => keys.map((key) => item[key] ?? "—")) //har bir data elementi uchun keysdan tegishli qiymatlar chaqiriladi
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n") // hadersni 1 ta qator qiladi va valuelarni vergul bilan ajratib /n yangi qatorga ajratadi
    const blob = new Blob([csv], { type: "text/csv" }) // blob browser filega oxshash malumot yaratish type uni qanday bolishi
    const url = URL.createObjectURL(blob) // blob uchun vaqtinchalik link yaratadi
    const a = document.createElement("a") // bu osha fileni yuklab olish
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
