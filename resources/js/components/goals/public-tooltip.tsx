import { CircleQuestionMark } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export function PublicTooltip() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button size="icon" variant="ghost">
                    <CircleQuestionMark />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Public goals can be viewed by anyone with a link.</p>
            </TooltipContent>
        </Tooltip>
    );
}
