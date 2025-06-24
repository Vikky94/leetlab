"use client"
import Link from "next/link"
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
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"
import {
    Search,
    Menu,
    Trophy,
    Code,
    MessageSquare,
    Moon,
    Sun
} from "lucide-react"
import { useTheme } from "next-themes"

export default function Navbar() {
    const { setTheme, theme } = useTheme();
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
                                ['Problems', 'Contest', 'Discuss', 'Sign in', 'Sign Up'].map((item) => {
                                    return (
                                        <NavigationMenuItem className="hover:text-orange-500" key={item}>
                                            <Link  href={`/${item.toLowerCase().replaceAll(" ", "")}`}>
                                                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} `}>
                                                    {item}
                                                </NavigationMenuLink>
                                            </Link>
                                        </NavigationMenuItem>
                                    )
                                })
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

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <div className="grid gap-6 py-6">
                                <Link href="/problems" className="flex items-center text-lg font-medium">
                                    <Code className="mr-3 h-5 w-5" />
                                    Problems
                                </Link>

                                <div className="space-y-1">
                                    <p className="flex items-center text-lg font-medium">
                                        <Trophy className="mr-3 h-5 w-5" />
                                        Contest
                                    </p>
                                    <div className="ml-8 space-y-2 mt-2">
                                        <Link href="/contests" className="block text-muted-foreground">
                                            Ongoing Contests
                                        </Link>
                                        <Link href="/contests/upcoming" className="block text-muted-foreground">
                                            Upcoming Contests
                                        </Link>
                                        <Link href="/contests/past" className="block text-muted-foreground">
                                            Past Contests
                                        </Link>
                                    </div>
                                </div>

                                <Link href="/interview" className="flex items-center text-lg font-medium text-amber-500">
                                    Interview Prep
                                </Link>

                                <Link href="/discuss" className="flex items-center text-lg font-medium">
                                    <MessageSquare className="mr-3 h-5 w-5" />
                                    Discuss
                                </Link>

                                <div className="pt-4 border-t">
                                    <Button variant="default" className="w-full bg-amber-500 hover:bg-amber-600">
                                        Sign up
                                    </Button>
                                    <Button variant="outline" className="w-full mt-2">
                                        Sign in
                                    </Button>
                                    <Button variant="outline" className="w-full mt-2 border-amber-500 text-amber-500">
                                        Premium
                                    </Button>

                                    <div className="mt-4">
                                        <p className="text-muted-foreground mb-2">Theme</p>
                                        <div className="flex gap-2">
                                            <Button
                                                variant={theme === "light" ? "default" : "outline"}
                                                className="flex-1"
                                                onClick={() => setTheme("light")}
                                            >
                                                Light
                                            </Button>
                                            <Button
                                                variant={theme === "dark" ? "default" : "outline"}
                                                className="flex-1"
                                                onClick={() => setTheme("dark")}
                                            >
                                                Dark
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}