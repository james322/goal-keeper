import { show } from '@/routes/goals';
import type { GoalType } from '@/types';
import { ShareIcon } from 'lucide-react';
import { MouseEvent, useRef, useState } from 'react';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';

export function ShareDropdown({ goal }: { goal: GoalType }) {
    const url = `${window.location.origin}${show(goal.id).url}`;
    const copy = useRef<HTMLInputElement>(null);
    const [copied, setCopied] = useState(false);

    function copyText(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                    <ShareIcon className="size-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Share</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="w-[500px] data-highlighted:bg-transparent" onClick={(e) => e.preventDefault()}>
                    <Input ref={copy} value={url} readOnly onClick={() => copy.current?.select()}></Input>
                    {copied ? (
                        <Button variant="outline" disabled>
                            Copied!
                        </Button>
                    ) : (
                        <Button variant="outline" onClick={copyText}>
                            Copy
                        </Button>
                    )}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
