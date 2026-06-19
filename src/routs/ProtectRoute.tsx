import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import type { Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  // bu yerda session bor, null yoq, undefined tikshirilmoqda

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })
    // datsur componenti mount bolganda uni tekshiramiz

    const { data: listener } = supabase.auth.onAuthStateChange(
      //listener = data = { subscription: { id, callback, unsubscribe } }
      (_event, newSession) => {
        setSession(newSession)
      }
    )
    //u har qanday auth holati o'zgarishida ishga tushadi: login bo'lganda, logout bo'lganda ham token automatik yangilanadi
    //auth holati o'zgarganda (login, logout, token yangilanishi va h.k.)

    return () => listener.subscription.unsubscribe()
    //useEffect cleanup function agar user login qilib kirib ketgandan keyin ham biz uni toxtatmasak u ishlayveradi [] clean up unmount bolganda ishlaydi
  }, [])

  if (session === undefined) {
    return <div>Loading...</div>
  }
  // user aniqlanayotgan vaqt loading boladi

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  //user bolmasa loginga navigate boladi

  return children
}

export default ProtectedRoute
