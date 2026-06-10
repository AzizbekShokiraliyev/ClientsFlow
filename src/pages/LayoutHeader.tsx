"use client"

import { Button } from "@/components/ui/button"
import { useDarkMode } from "@/hooks/useDarkMode";
import { Moon, Sun } from 'lucide-react';
import { Link } from "react-router-dom";

const LayoutHeader = () => {
  const {isDark, toggleTheme} = useDarkMode()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="text-xl font-bold tracking-tight text-primary">
          ClientFlow
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleTheme}
          >
            {isDark ? <Sun size={"icon"} /> : <Moon size={"icon"} />}
          </Button>

          <Link to='/login'><Button variant="outline" size="lg">Login</Button></Link>
          <Link to='/register'><Button size="lg">Register</Button></Link>
        </div>
      </div>
    </header>
  )
}

export default LayoutHeader