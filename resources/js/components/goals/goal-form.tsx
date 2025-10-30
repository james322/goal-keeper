import { store } from '@/routes/goals';
import { Form } from '@inertiajs/react';
import { Button } from '../ui/button';

export function GoalForm() {
    return (
        <Form action={store()} resetOnSuccess>
            {({ errors }) => (
                <>
                    <textarea
                        autoFocus
                        className="block h-full w-full resize-none overflow-hidden border-0 border-b bg-transparent pb-0 text-gray-800 focus:ring-0 focus:outline-0 dark:text-gray-200"
                        placeholder="What would you like to accomplish?"
                        name="intent"
                    ></textarea>
                    {errors.intent && <p className="text-red-500">{errors.intent}</p>}
                    <Button type="submit" size="lg" variant="secondary">
                        Save
                    </Button>
                </>
            )}
        </Form>
    );
}
