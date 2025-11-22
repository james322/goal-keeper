import { useLocalStorage } from '@/hooks/use-local-storage';
import { store } from '@/routes/goals';
import { Form } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';

export function GoalForm() {
    const [characterCount, setCharacterCount] = useState(0);
    const [value, setLocalStorage] = useLocalStorage('goal-keeper.newGoal');

    function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const textArea = e.target;
        textArea.style.height = 'auto';
        textArea.style.height = `${textArea.scrollHeight}px`;
        setLocalStorage(textArea.value);
    }

    useEffect(() => {
        setCharacterCount(value.length);
    }, [value]);

    return (
        <Form
            action={store()}
            resetOnSuccess
            disableWhileProcessing
            onSuccess={() => setLocalStorage('')}
            options={{
                reset: ['goals'],
                preserveScroll: false,
            }}
            className="space-y-2"
        >
            {({ errors, processing }) => (
                <>
                    <textarea
                        autoFocus
                        className="block h-full w-full resize-none overflow-hidden border-0 border-b bg-transparent pb-0 text-gray-800 focus:ring-0 focus:outline-0 dark:text-gray-200"
                        placeholder="What would you like to accomplish?"
                        name="intent"
                        onChange={handleInputChange}
                        maxLength={500}
                        value={value}
                    ></textarea>
                    <div className="flex items-center justify-between text-base text-gray-800 dark:text-gray-200">
                        <span className="tracking-wide">{`${characterCount}/500`}</span>
                        <Button disabled={processing} type="submit" size="lg" variant="secondary">
                            {processing ? <Spinner /> : 'Save'}
                        </Button>
                    </div>
                    <div>{errors.intent && <p className="text-red-500">{errors.intent}</p>}</div>
                </>
            )}
        </Form>
    );
}
