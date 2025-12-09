import { useTextarea } from '@/hooks/goals/use-textarea';
import { store } from '@/routes/comments';
import type { GoalType, ShowGoalData } from '@/types';
import { Form, usePage } from '@inertiajs/react';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { Textarea } from './textarea';

export function CommentForm({ goal }: { goal: GoalType }) {
    const { characterCount, handleInputChange, handleKeyDown, setLocalStorage, setIsFocused, showSaveText, value } =
        useTextarea('goal-keeper.newComment');

    const can = usePage<ShowGoalData>().props.can;
    const placeholder = can.update_goal ? 'Post a comment or document your progress.' : `Want to give ${goal?.user?.name} some motivation/feedback?`;

    return (
        <Form action={store(goal.id)} resetOnSuccess disableWhileProcessing onSuccess={() => setLocalStorage('')}>
            {({ errors, processing, submit }) => (
                <>
                    <Textarea
                        autoFocus
                        placeholder={placeholder}
                        name="body"
                        onChange={handleInputChange}
                        maxLength={500}
                        value={value}
                        onKeyDown={(e) => handleKeyDown(e, submit)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    ></Textarea>
                    <div className="flex items-center justify-between pt-2 text-base text-gray-800 dark:text-gray-200">
                        <span className="tracking-wide">{`${characterCount}/500`}</span>
                        <span className="flex items-center space-x-2">
                            {showSaveText && <span>ctrl + enter</span>}
                            <Button disabled={processing} type="submit" size="lg">
                                {processing ? <Spinner /> : 'Comment'}
                            </Button>
                        </span>
                    </div>
                    <div>{errors.body && <p className="text-red-500">{errors.body}</p>}</div>
                </>
            )}
        </Form>
    );
}
