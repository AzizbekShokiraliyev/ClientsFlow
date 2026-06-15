import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Moon, Sun } from 'lucide-react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '../ui/breadcrumb'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../theme-provider'

const Header = () => {
    const location = useLocation()
    const pathNames = location.pathname.split('/').filter(x => x);
    const {theme, setTheme} = useTheme()
    const isDark = theme === "dark";

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur'>
        <div className='container mx-auto flex h-16 items-center justify-between px-4 md:px-6'>
            <div>
                <Breadcrumb>
                    <BreadcrumbList>
                            {pathNames.map((segment, index) => {
                                const to = `/${pathNames.slice(0, index + 1).join('/')}`
                                const label = segment.charAt(0).toUpperCase() + segment.slice(1);
                                const isLast = index === pathNames.length - 1;
                                return(
                                    <BreadcrumbItem key={to}>
                                    {isLast ? (<span className="font-medium">{label}</span>) : (
                                        <BreadcrumbLink asChild>
                                        <Link to={to}>{label}</Link>
                                        </BreadcrumbLink>
                                    )}
                                    </BreadcrumbItem>
                                )
                            })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>


        <div className='flex items-center gap-3'>
            <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}>
            {isDark ? <Sun size={20} /> : <Moon size={20}/>}
            </Button>

            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                    <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                    <AvatarFallback>AS</AvatarFallback>
                </Avatar>
            </Button>
        </div>
        </div>
    </header>
  )
}

export default Header
