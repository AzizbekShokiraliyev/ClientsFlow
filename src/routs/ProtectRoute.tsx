import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import type { Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()

  // undefined = hali tekshirilmoqda
  // null      = sessiya yo'q (login qilinmagan)
  // Session   = sessiya bor (login qilingan)
  const [session, setSession] = useState<Session | null | undefined>(undefined)

  useEffect(() => {
    // Ilova ochilganda sessiyani bir marta tekshiramiz
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    // Va keyin har qanday o'zgarishni (login, logout, token yangilanishi,
    // boshqa tabda chiqib ketish va h.k.) real vaqtda kuzatamiz
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession)
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  // Hali tekshirilmoqda — hech narsa (himoyalangan kontent) ko'rsatmaymiz
  if (session === undefined) {
    return <div>Loading...</div>
  }

  // Sessiya yo'q — RENDER paytida darhol Login'ga yo'naltiramiz.
  // navigate() dan farqli o'laroq, bu yerda "children" hech qachon
  // bir lahzaga ham qaytarilmaydi va ekranga chiqmaydi.
  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  // Sessiya bor — himoyalangan kontentni ko'rsatamiz
  return children
}

export default ProtectedRoute
