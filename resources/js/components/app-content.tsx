import { SidebarInset } from '@/components/ui/sidebar';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import * as React from 'react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Toaster } from './ui/sonner';

interface AppContentProps extends React.ComponentProps<'main'> {
    variant?: 'header' | 'sidebar';
}

export function AppContent({ variant = 'header', children, ...props }: AppContentProps) {
    const flashMessage = usePage<SharedData>().props.flash.message;

    useEffect(() => {
        if (flashMessage) {
            toast(flashMessage);
        }
    }, [flashMessage]);

    if (variant === 'sidebar') {
        return <SidebarInset {...props}>{children}</SidebarInset>;
    }

    return (
        <main className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl" {...props}>
            <Toaster />
            {children}
        </main>
    );
}
