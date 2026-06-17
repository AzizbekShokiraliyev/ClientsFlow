import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabase"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/login")
      }
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Loading...</div>

  return children
}

export default ProtectedRoute
