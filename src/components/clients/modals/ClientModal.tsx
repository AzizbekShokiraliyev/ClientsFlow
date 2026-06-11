import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Client } from "@/interface/Interface"
import { Bookmark, Pencil, Plus } from "lucide-react"

interface ClientModalProps{
    client?: Client;
}

const ClientModal = ({ client }: ClientModalProps) => {
    const isEdit = !!client
  return (
    <div>
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    {isEdit ? (<Button variant="secondary" size="icon"><Pencil className="h-4 w-4" /></Button>) : (<Button size='lg'><span><Plus/></span>Add client</Button>)}
                </DialogTrigger>

                <DialogContent className="sm:max-w-sm">
                    <div className="text-center text-lg">
                        <DialogHeader>{isEdit ? "Edit client" : "Add new client"}</DialogHeader>
                    </div>

                    <FieldGroup>
                        <div className="flex gap-4 items-center">
                            <Field>
                                <Label>First name</Label>
                                <Input name="firstName" defaultValue={client?.firstName ?? "John"} required/>
                            </Field>
                            <Field>
                                <Label>Last name</Label>
                                <Input name="lastName" defaultValue={client?.lastName ?? "Doe"} required/>
                            </Field>
                        </div>

                        <Field>
                            <Label>Email</Label>
                            <Input name="email" type="email" defaultValue={client?.email ?? "example@gmail.com"} required/>
                        </Field>
                        <Field>
                            <Label>Phone number</Label>
                            <Input name="phoneNumber" type="tel" defaultValue={client?.phoneNumber ?? "+123456789"} required/>
                        </Field>
                        <Field>
                            <Label>Company name</Label>
                            <Input name="company" defaultValue={client?.company ?? "Google"} required/>
                        </Field>

                        <div className="flex items-end gap-2">
                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="date">Today's Date</Label>
                                <Input name="date" type="date" defaultValue={client?.updated_at?.split("T")[0]}/>
                            </div>
                            <Button type="submit">
                            {isEdit ? (
                                <>
                                <Bookmark/> Save changes
                                </>
                            ) : (
                                <>
                                <Plus/> Add
                                </>
                            )}
                            </Button>
                        </div>
                    </FieldGroup>
                </DialogContent>
            </form>
        </Dialog>
    </div>
  )
}

export default ClientModal
