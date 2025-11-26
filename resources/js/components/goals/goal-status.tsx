import { complete, incomplete } from '@/routes/goals/status';
import { Goal as GoalType } from '@/types';
import { Form } from '@inertiajs/react';
import { CheckIcon } from 'lucide-react';
import { Button } from '../ui/button';

export function GoalStatus({ goal }: { goal: GoalType }) {
    return (
        <>
            {!goal.completed && (
                <Form className="inline-block" action={complete(goal.id)} disableWhileProcessing>
                    <input type="hidden" name="completed" value={1} />
                    <Button
                        type="submit"
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer place-self-center hover:text-green-600 focus:text-green-600"
                    >
                        <CheckIcon />
                    </Button>
                </Form>
            )}
            {goal.completed && (
                <Form className="inline-block" action={incomplete(goal.id)} disableWhileProcessing>
                    <input type="hidden" name="completed" value={0} />
                    <Button
                        type="submit"
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer place-self-center text-green-600 hover:text-red-600 focus:text-red-600"
                    >
                        <CheckIcon />
                    </Button>
                </Form>
            )}
        </>
    );
}
