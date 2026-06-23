import { Bookmark, ChevronDownIcon, Pencil, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog"
import { Field, FieldGroup } from "../../ui/field"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
import type { DealClientModalProps } from "@/interface/Interface"
import { useState, useEffect } from "react"
import { useDealCreate, useDealUpdate } from "@/hooks/useDeal"
import { supabase } from "@/lib/supabase"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { dealSchema, type DealValues } from "@/lib/validation"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

const AddClientDealModal = ({ deal }: DealClientModalProps) => {
  const isEdit = !!deal
  const [open, setOpen] = useState(false)
  const { clientId } = useParams()

  const [date, setDate] = useState<Date | undefined>(
    deal?.created_at ? new Date(deal.created_at) : undefined
  )

  const { mutate: editDeal, isPending: Updating } = useDealUpdate()
  const { mutate: createDeal, isPending: Creating } = useDealCreate()
  const isPending = Creating || Updating

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DealValues>({
    resolver: zodResolver(dealSchema),
    values: {
      title: deal?.title ?? "",
      status: deal?.status ?? "New",
      date: deal?.created_at ? deal.created_at.split("T")[0] : "",
    },
  })

  useEffect(() => {
    if (!open && !isEdit) {
      reset()
    }
  }, [open, isEdit, reset])

  const handleDateSelect = (selected: Date | undefined) => {
    setDate(selected)
    setValue("date", selected ? format(selected, "yyyy-MM-dd") : "", {
      shouldValidate: true,
    })
  }

  const handleOpenChange = (val: boolean) => {
    setOpen(val)
    if (!val && !isEdit) {
      setDate(undefined)
    }
  }

  const onSubmit = async (data: DealValues) => {
    try {
      if (isEdit) {
        editDeal(
          {
            id: deal.id,
            title: data.title,
            status: data.status,
            created_at: data.date
              ? new Date(data.date).toISOString()
              : undefined,
          },
          {
            onSuccess: () => setOpen(false),
          }
        )
      } else {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          toast.error("Iltimos, avval tizimga kiring!")
          return
        }

        createDeal(
          {
            title: data.title,
            status: data.status,
            user_id: user.id,
            client_id: clientId!,
          },
          {
            onSuccess: () => {
              setOpen(false)
              reset()
              setDate(undefined)
            },
            onError: (err) => console.error("Xatolik:", err),
          }
        )
      }
    } catch (error) {
      console.error("Kutilmagan xatolik:", error)
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          {isEdit ? (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-none border-0"
            >
              <Pencil />
            </Button>
          ) : (
            <Button>
              <Plus />
              Add deal
            </Button>
          )}
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pb-3 text-center text-lg">
              <DialogTitle>{isEdit ? "Edit deal" : "Add Deal"}</DialogTitle>
            </div>

            <FieldGroup>
              <Field>
                <Label>Title</Label>
                <Input placeholder="Write deal" {...register("title")} />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </Field>

              <Field>
                <Label>Status</Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full max-w-96">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="In Progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="Won">Won</SelectItem>
                          <SelectItem value="Lost">Lost</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.status.message}
                  </p>
                )}
              </Field>

              <div className="flex items-end gap-2">
                <div className="grid w-full gap-1.5">
                  <Label>Deal Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!date}
                        className="w-[270px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                      >
                        {date ? format(date, "PPP") : <span>dd/mm/yyyy</span>}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        defaultMonth={date}
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.date.message}
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={isPending}>
                  {isEdit ? (
                    <>
                      <Bookmark /> {isPending ? "Saving..." : "Save"}
                    </>
                  ) : (
                    <>
                      <Plus /> {isPending ? "Adding..." : "Add"}
                    </>
                  )}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddClientDealModal
