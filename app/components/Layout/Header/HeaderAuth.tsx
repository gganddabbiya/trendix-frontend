'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import UserAvatar from '../../Common/UserAvatar'

// Define the user info interface (you might want to move this to types)
interface HeaderAuthProps {
    onSignInClick: () => void;
}


const HeaderAuth: React.FC<HeaderAuthProps> = ({ onSignInClick }) => {
    const { logout, isLoggedIn, name, avatarUrl } = useAuth()

    return (
        <div className='flex items-center gap-4'>
            {!isLoggedIn ? (
                <button
                    className='hidden lg:block bg-transparent text-primary border hover:bg-primary border-primary hover:text-white duration-300 px-6 py-2 rounded-lg hover:cursor-pointer'
                    onClick={onSignInClick}>
                    Sign In
                </button>
            ) : (
                <div className="flex items-center gap-4">
                    <Link
                        href="/user/detail"
                        className="flex items-center gap-2 p-2 rounded-lg transition-colors duration-200"
                    >
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                            <UserAvatar
                                src={avatarUrl}
                                alt="Profile"
                                className="w-full h-full"
                            />
                        </div>
                        <span className="text-gray-700 font-medium text-sm">{name}</span>
                    </Link>
                    <button
                        className='bg-transparent text-primary border hover:bg-primary border-primary hover:text-white duration-300 px-6 py-2 rounded-lg hover:cursor-pointer'
                        onClick={() => {
                            logout()
                        }}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}

export default HeaderAuth
