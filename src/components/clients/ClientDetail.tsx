import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ArrowLeft, Building2, Mail, Phone, User, Pencil, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { ButtonGroup } from '../ui/button-group'

type DealStatus = 'New' | 'In Progress' | 'Won' | 'Lost'

interface Deal {
  id: string
  title: string
  status: DealStatus
  created_at: string
}

const client = {
  id: '1',
  name: 'Azizbek Shokiraliyev',
  email: 'aziz@gmail.com',
  phone: '+998931510604',
  company: 'GL Solutions',
}

const deals: Deal[] = [
  { id: '1', title: 'Website Redesign', status: 'In Progress', created_at: '2026-01-15T00:00:00Z' },
  { id: '2', title: 'SEO Package', status: 'New', created_at: '2026-02-03T00:00:00Z' },
  { id: '3', title: 'Mobile App', status: 'Won', created_at: '2026-03-20T00:00:00Z' },
]

const statusStyles: Record<DealStatus, string> = {
  'New': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'In Progress': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Won': 'bg-green-500/10 text-green-400 border-green-500/20',
  'Lost': 'bg-red-500/10 text-red-400 border-red-500/20',
}

const ClientDetail = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Link to="/clients" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Clients
      </Link>

      <Card className="mb-6">
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold">{client.name}</h2>
          </div>
          <div className="flex gap-4 text-[15px] text-muted-foreground py-1">
            <div className="flex items-center gap-2">
              <Mail />
              {client.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone />
              {client.phone}
            </div>
            <div className="flex items-center gap-2">
              <Building2/>
              {client.company}
            </div>
          </div>
        </CardContent>
        </Card>
        <Card>      
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Deals</CardTitle>
          <Button size="sm">+ Add Deal</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-10 text-center text-sm text-muted-foreground">
                    No deals yet.
                  </TableCell>
                </TableRow>
              ) : (
                deals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell className="font-medium">{deal.title}</TableCell>
                    <TableCell>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-md border ${statusStyles[deal.status]}`}>
                        {deal.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(deal.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex items-center rounded-md border divide-x overflow-hidden">
                        <ButtonGroup>
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-none border-0 h-8 w-8"
                              onClick={() => {}}>
                              <Pencil size='icon' />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-none border-0 h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => {}}>
                              <Trash2 size="icon" />
                            </Button>
                        </ButtonGroup>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  )
}

export default ClientDetail