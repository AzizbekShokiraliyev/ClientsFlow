import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ClientModalProps } from "@/interface/Interface"
import { Bookmark, Pencil, Plus } from "lucide-react"

const ClientModal = ({ client }: ClientModalProps) => {
    const isEdit = !!client
  return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    {isEdit ? (<Button variant="secondary" size="lg"><Pencil/></Button>) : (<Button size='lg'><span><Plus/></span>Add client</Button>)}
                </DialogTrigger>

                <DialogContent className="sm:max-w-sm">
                    <div className="text-center text-lg">
                        <DialogHeader>{isEdit ? "Edit client" : "Add new client"}</DialogHeader>
                    </div>

                    <FieldGroup>
                        <Field>
                            <Label>Full name</Label>
                            <Input 
                                name="firstName" 
                                placeholder="John Doe"
                                defaultValue={client?.fullName ?? ""} required/>
                        </Field>
                        <Field>
                            <Label>Email</Label>
                            <Input 
                                name="email" 
                                placeholder="example@gmail.com"
                                type="email" defaultValue={client?.email ?? ""} required/>
                        </Field>
                        <Field>
                            <Label>Phone number</Label>
                            <Input 
                                name="phoneNumber" 
                                placeholder="+123456789"
                                type="tel" defaultValue={client?.phoneNumber ?? ""} required/>
                        </Field>
                        <Field>
                            <Label>Company name</Label>
                            <Input 
                                name="company" 
                                placeholder="Google"
                                defaultValue={client?.company ?? ""} required/>
                        </Field>

                        <div className="flex items-end gap-2">
                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="date">Today's Date</Label>
                                <Input name="date" type="date" defaultValue={client?.updated_at?.split("T")[0]}/>
                            </div>
                            <Button type="submit">
                            {isEdit ? (<><Bookmark/> Save changes</>) : (<><Plus/> Add</>)}
                            </Button>
                        </div>
                    </FieldGroup>
                </DialogContent>
            </form>
        </Dialog>
  )
}

export default ClientModal
