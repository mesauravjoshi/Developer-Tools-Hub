import {useEffect} from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
} from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';

const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#' },
]

export const NavBar = ({ sidebarOpen, setSidebarOpen }) => {
    const dispatch = useDispatch();
    const [gravatarUrl, setGravatarUrl] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const generateGravatar = async (email) => {
            if (true) {
                // const email = session.user.email.trim().toLowerCase();
                try {
                    const response = await axios.get(`https://api.hashify.net/hash/md5/hex?value=${email}`);
                    const hash = response.data?.Digest
                    if (hash) {
                        console.log(`https://www.gravatar.com/avatar/${hash}?d=identicon`);
                        setGravatarUrl(`https://www.gravatar.com/avatar/${hash}?d=identicon`);
                    }
                } catch (error) {
                    console.error('Failed to fetch MD5 hash for Gravatar:', error);
                }
            }
        };
        const getUserData = localStorage.getItem('user_data');
        const userData = JSON.parse(getUserData);
        setUsername(userData?.username)
        if (userData.email) {
            generateGravatar(userData.email);
        }
    }, []);

    return (
        <div className="sticky top-0 z-40 flex h-12 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
            </button>

            {/* Separator */}
            <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <form action="#" method="GET" className="grid flex-1 grid-cols-1">
                    <input
                        name="search"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm/6"
                    />
                    <MagnifyingGlassIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
                    />
                </form>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">View notifications</span>
                        <BellIcon aria-hidden="true" className="size-6" />
                    </button>

                    {/* Separator */}
                    <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative">
                        <MenuButton className="-m-1.5 flex items-center p-1.5">
                            <span className="sr-only">Open user menu</span>
                            <img
                                alt=""
                                src={`${gravatarUrl}`}
                                className="size-8 rounded-full bg-gray-50"
                            />
                            <span className="hidden lg:flex lg:items-center">
                                <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-900">
                                    {username}
                                </span>
                                <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-400" />
                            </span>
                        </MenuButton>
                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                            {userNavigation.map((item) => (
                                <MenuItem key={item.name}>
                                    <a
                                        href={item.href}
                                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                    >
                                        {item.name}
                                    </a>
                                </MenuItem>
                            ))}
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </div>
    )
}