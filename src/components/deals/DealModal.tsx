import type { DealModalProps } from "@/interface/Interface"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { Bookmark, Pencil, Plus } from "lucide-react"
import { Field, FieldGroup } from "../ui/field"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"

const DealModal = ({deal}: DealModalProps) => {
    const isEdit = !!deal
  return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    {isEdit ? (<Button variant="secondary" size="lg"><Pencil className="h-4 w-4" /></Button>) : (<Button size="lg"><span><Plus/></span>Add client</Button>)}
                </DialogTrigger>

                <DialogContent className="sm:max-w-sm">
                    <div className="text-center text-lg">
                        <DialogHeader>{isEdit ? "Edit deal" : "Add new deal"}</DialogHeader>
                    </div>

                    <FieldGroup>
                        <Field>
                            <Label>Title</Label>
                            <Input 
                                name="title" 
                                placeholder="Enter deal name..." 
                                defaultValue={deal?.title ?? ""}/>
                        </Field>
                        <Field>
                            <Label>Description</Label>
                            <Textarea 
                                name="description" 
                                placeholder="You can write any description..." 
                                defaultValue={deal?.description ?? ""}/>
                        </Field>
                        <Field>
                            <Label>Status</Label>
                            <Select>
                                <SelectTrigger className="w-full max-w-96">
                                    <SelectValue placeholder="Select status"/>
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Todo">Todo</SelectItem>
                                        <SelectItem value="InProgress">In progress</SelectItem>
                                        <SelectItem value="Done">Done</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <div className="flex items-end gap-2">
                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="date">Today's Date</Label>
                                <Input name="date" type="date" defaultValue={deal?.due_date?.split("T")[0]}/>
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
  )
}

export default DealModal
