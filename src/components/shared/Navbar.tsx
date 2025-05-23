"use client";
import Logo from "@/app/assets/svgs/Logo";
import { Button } from "../ui/button";
import { Heart, LogOut, ShoppingBag } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import { usePathname, useRouter } from "next/navigation";
import { privetRoutes } from "@/constant";

export default function Navbar() {
    const { user, setIsLoading } = useUser();
    const pathname = usePathname();
    const router = useRouter();
    const handleLogout = () => {
        logout();
        setIsLoading(true);
        if (privetRoutes.some((route) => pathname.match(route))) {
            router.push("/");
        }
    };
    return (
        <header className='border-b w-full'>
            <div className='container flex justify-between items-center mx-auto h-16 px-3'>
                <h1 className='text-2xl font-black flex items-center'>
                    <Logo />
                    Next Mart
                </h1>
                <div className='max-w-md  flex-grow'>
                    <input
                        type='text'
                        placeholder='Search for products'
                        className='w-full max-w-6xl border border-gray-300 rounded-full py-2 px-5'
                    />
                </div>
                <nav className='flex gap-2'>
                    <Button
                        variant='outline'
                        className='rounded-full p-0 size-10'>
                        <Heart />
                    </Button>
                    <Button
                        variant='outline'
                        className='rounded-full p-0 size-10'>
                        <ShoppingBag />
                    </Button>

                    {user ? (
                        <>
                            {!user?.hasShop && (
                                <Link href='/create-shop'>
                                    <Button className='rounded-full '>
                                        Create Shop
                                    </Button>
                                </Link>
                            )}
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarImage src='https://github.com/shadcn.png' />
                                        <AvatarFallback>User</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href={`/${user?.role}/dashboard`}>
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>My Shop</DropdownMenuItem>
                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                        className='hover:bg-red-500'
                                        onClick={handleLogout}>
                                        <LogOut />
                                        <span>Log Out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <Link href='/login'>
                            <Button variant='outline' className='rounded-full '>
                                Login
                            </Button>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
