"use client"
import Link from "next/link"
import React from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Search,
    Moon,
    Sun,
    User,
    LayoutDashboard,
    UserRoundPen,
    LogOut
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { useAuthStore } from "@/store"
import { useRouter} from 'next/navigation'



export default function Navbar() {
    const router = useRouter();
    let navigationMenuItems = ['Problems', 'Contest', 'Discuss', 'Sign in', 'Sign Up'];
    const { setTheme, theme } = useTheme();
    const { isAuthenticated, logout } = useAuthStore();
    console.log(`isAuthenticated -> ${isAuthenticated}`);
    const authenticatedRoutes = [{ "name": 'Dashboard', "icon": LayoutDashboard }, { "name": 'Profile', "icon": UserRoundPen }].map((item, key) => {
        return (
            <DropdownMenuItem className="hover:cursor-pointer" key={key}>
                <Link href={`/${item.name.toLowerCase().replaceAll(" ", "")}`} className="flex justify-between items-center gap-2.5">
                    {React.createElement(item.icon, { size: 24 })}
                    {item.name}</Link>
            </DropdownMenuItem>
        );
    })
    const handleLogoutClick = async (e: MouseEvent) => {
        await logout();
        router.push("/")
    }
    if (isAuthenticated) navigationMenuItems = ['Problems', 'Contest', 'Discuss'];
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="bg-amber-500 w-8 h-8 rounded-md flex items-center justify-center">
                            <span className="text-gray-900 font-bold text-xl">C</span>
                        </div>
                        <span className="font-bold text-xl hidden sm:inline-block">{process.env.NEXT_PUBLIC_APP_NAME}</span>
                    </Link>
                </div>


                {/* Search Bar */}
                <div className="hidden md:flex w-full max-w-md">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search problems..."
                            className="w-full pl-10 bg-muted"
                        />
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {
                                navigationMenuItems.map((item) => {
                                    return (
                                        <NavigationMenuItem key={item}>
                                            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} `} asChild>
                                                <Link href={`/${item.toLowerCase().replaceAll(" ", "")}`}>{item}</Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    )
                                })
                            }
                            {isAuthenticated &&
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="hover:cursor-pointer"><User size={28} /></DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {authenticatedRoutes}
                                        <DropdownMenuItem onClick={(e) => handleLogoutClick(e)} className="hover:cursor-pointer"><LogOut size={28} />Log out</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            }
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>



                {/* Right Actions */}
                <div className="flex items-center gap-2">

                    <Button variant="outline" size="icon" className="hidden md:flex">
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5" onClick={() => setTheme("light")} />
                        ) : (
                            <Moon className="h-5 w-5" onClick={() => setTheme("dark")} />
                        )}
                    </Button>
                </div>
            </div>
        </header>
    )
}