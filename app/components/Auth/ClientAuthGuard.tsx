'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loader from '@/app/components/Common/Loader';

/**
 * ClientAuthGuard
 * Protects routes by checking authentication status on the client side.
 * Relies on AuthContext to check session status.
 */
export default function ClientAuthGuard({ children }: { children: React.ReactNode }) {
    const { isLoggedIn, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace('/');
        }
    }, [isLoggedIn, router]);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader />
            </div>
        );
    }

    // Prevent flash of content if redirected
    if (!isLoggedIn) {
        return null;
    }

    return <>{children}</>;
}
