import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction } from 'react';
import MarkDown from 'react-markdown';
import { Button } from '../ui/button';
import { AiMotivationSkeleton } from './ai-motivation-skeleton';

interface AiMotivationProps {
    motivation: string | null;
    busy: boolean;
    collapsed: boolean;
    setCollapsed: Dispatch<SetStateAction<boolean>>;
}

export function AiMotivation({ motivation, busy, collapsed, setCollapsed }: AiMotivationProps) {
    return (
        <div className="grid w-full animate-grow grid-cols-6 items-center rounded-sm bg-stone-100 px-2 dark:bg-stone-800">
            <span className={cn(['relative col-span-6 p-2', { 'max-h-[200px] overflow-hidden': motivation && collapsed }])}>
                {motivation && (
                    <div
                        className={cn([
                            'animate-grow space-y-4',
                            { 'max-h-[200px] overflow-hidden mask-b-from-20% mask-b-to-80%': motivation && collapsed },
                        ])}
                    >
                        <MarkDown>{motivation}</MarkDown>
                    </div>
                )}
                {motivation && (
                    <div className={cn({ 'absolute inset-x-0 bottom-0 z-10': collapsed }, 'flex w-full items-center justify-center p-2')}>
                        <Button variant="outline" className="cursor-pointer" onClick={() => setCollapsed((prev) => !prev)}>
                            {collapsed ? 'See More' : 'See Less'}
                        </Button>
                    </div>
                )}
                {busy && <AiMotivationSkeleton />}
            </span>
        </div>
    );
}
