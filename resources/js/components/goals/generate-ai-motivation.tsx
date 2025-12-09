import { cn } from '@/lib/utils';
import { GoalType } from '@/types';
import { Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface GenerateAIMotivationProps {
    motivation: string | null;
    goal: GoalType;
    busy: boolean;
    getMotivation: () => void;
}

export function GenerateAiMotivation({ motivation, goal, busy, getMotivation }: GenerateAIMotivationProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    title="AI motivation"
                    size="icon"
                    variant="ghost"
                    className={cn([
                        { 'animate-bounce': !motivation && !goal.completed && !busy, 'animate-spin': busy },
                        'cursor-pointer place-self-center text-yellow-500 hover:text-yellow-500 focus:text-yellow-500',
                    ])}
                    disabled={busy || !!motivation || !!goal.completed}
                    onClick={() => getMotivation()}
                >
                    {<Sparkles className={cn(['size-6', { 'animate-pulse': busy }])} />}
                </Button>
            </TooltipTrigger>
            <TooltipContent>AI motivation</TooltipContent>
        </Tooltip>
    );
}
