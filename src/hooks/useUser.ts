import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export const useUser = () => {
    const [userId, setUserId] = useState<string>("")

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUserId(data.user?.id ?? "")
        })
    }, [])

    return { userId }
}