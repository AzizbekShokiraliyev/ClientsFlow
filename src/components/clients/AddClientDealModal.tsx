import { Bookmark, Pencil, Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../ui/dialog'
import { Field, FieldGroup } from '../ui/field'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import type { DealClientModalProps } from '@/interface/Interface'

const AddClientDealModal = ({deal}: DealClientModalProps) => {
    const isEdit = !!deal
  return (
    <div>
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    {isEdit ? <Button variant="outline" size="icon" className="rounded-none border-0 h-8 w-8"> <Pencil size='icon'/></Button> : <Button><Plus/>Add deal</Button>}
                </DialogTrigger>

                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>{isEdit ? "Edit deal" : "Add Deal"}</DialogHeader>

                    <FieldGroup>
                        <Field>
                            <Label>Title</Label>
                            <Input name='title' placeholder='Write deal' defaultValue={deal?.title ?? ""}/>
                        </Field>
                        
                        <Field>
                            <Label>Status</Label>

                            <Select>
                                <SelectTrigger className="w-full max-w-96">
                                    <SelectValue placeholder="Select status"/>
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Todo">New</SelectItem>
                                        <SelectItem value="InProgress">In progress</SelectItem>
                                        <SelectItem value="Done">Won</SelectItem>
                                        <SelectItem value="Done">Lost</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>

                        <div className='flex items-end gap-2'>
                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="date">Today's Date</Label>
                                <Input name="date" type="date" defaultValue={deal?.created_at?.split("T")[0]}/>
                            </div>
                            <Button type="submit">
                            {isEdit ? (<><Bookmark/> Save changes</>) : (<><Plus/> Add</>)}
                            </Button>
                        </div>
                    </FieldGroup>
                </DialogContent>
            </form>
        </Dialog>
    </div>
  )
}

export default AddClientDealModal
