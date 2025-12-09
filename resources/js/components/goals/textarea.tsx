import { cn } from '@/lib/utils';
import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

export function Textarea({ className, ...props }: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>) {
    return (
        <textarea
            className={cn([
                'block h-full w-full resize-none overflow-hidden border-0 border-b bg-transparent pb-0 text-gray-800 focus:ring-0 focus:outline-0 dark:text-gray-200',
                className,
            ])}
            {...props}
        ></textarea>
    );
}
