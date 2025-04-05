import { useNavigate } from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MouseEventHandler } from "react";

export const Navbar = ({ authorName, title, onClick }: { authorName: string, title: string, onClick: MouseEventHandler }) => {
    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem("token");
        navigate('/signin');
    }

    return (
        <div className="sticky top-0 bg-white flex justify-between p-4 shadow-sm">
            <div className=" flex ps-2 pe-2 lg:ps-16 items-center">
                {/* website heading */}
                <div className="text-3xl font-bold pe-4">
                    <button onClick={() => navigate('/blogs')} className="transition duration-400 text-transparent bg-clip-text bg-linear-to-br from-violet-600 to-pink-400 hover:from-violet-600 hover:to-green-400 active:from-violet-700 active:to-green-600 hover:cursor-pointer ">BlogIt</button>
                </div>
            </div>
            <div className=" flex items-center ps-2 pe-2 lg:pe-16">
                {/* create blog */}
                <button onClick={onClick} className="transition duration-400 bg-gradient-to-br from-violet-600 to-pink-400 hover:from-violet-600 hover:to-green-400 hover:cursor-pointer active:from-violet-700 active:to-green-600 text-white text-sm font-medium rounded-3xl py-2 px-4 shadow-md shadow-gray-300">{title}</button>

                {/* notif icon */}
                <div className="px-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 hover:text-gray-700 hover:cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                </div>
                {/* user icon */}
                <UserBtn onClick={signOut} authorName={authorName}></UserBtn>
            </div>
        </div>
    )
}

const UserBtn = ({ authorName, onClick }: { authorName: string, onClick: MouseEventHandler }) => {
    return (
        <div className="">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="transition duration-400 bg-gradient-to-br from-violet-600 to-pink-400 hover:bg-gradient-to-br hover:from-violet-600 hover:to-green-400 hover:cursor-pointer active:bg-violet-700 px-4 py-2 text-white rounded-full shadow-md shadow-gray-300">{authorName[0].toUpperCase()}</button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>My Account</DropdownMenuItem>
                    <DropdownMenuItem className="transition duration-400 bg-gradient-to-br from-violet-600 to-pink-400 hover:from-violet-500 hover:to-green-400 active:from-violet-700 active:to-green-600 hover:cursor-pointer text-white focus:text-white" onClick={onClick}>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}