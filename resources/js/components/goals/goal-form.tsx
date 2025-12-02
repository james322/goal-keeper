import { useLocalStorage } from '@/hooks/use-local-storage';
import { store } from '@/routes/goals';
import { Form } from '@inertiajs/react';
import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';

export function GoalForm() {
    const [characterCount, setCharacterCount] = useState(0);
    const [value, setLocalStorage] = useLocalStorage('goal-keeper.newGoal');
    const [isFocused, setIsFocused] = useState(false);
    const [showSaveText, setShowSaveText] = useState(false);

    function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const textArea = e.target;
        textArea.style.height = 'auto';
        textArea.style.height = `${textArea.scrollHeight}px`;
        setLocalStorage(textArea.value);
    }

    useEffect(() => {
        setCharacterCount(value.length);
    }, [value]);

    useEffect(() => {
        if (isFocused && value.trim().length > 0) {
            setShowSaveText(true);
        } else {
            setShowSaveText(false);
        }
    }, [isFocused, value]);

    function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>, callback: () => void) {
        if ((e.key === 'Enter' || e.keyCode === 13) && e.ctrlKey) {
            e.preventDefault();
            callback();
        }
    }

    return (
        <Form action={store()} resetOnSuccess disableWhileProcessing onSuccess={() => setLocalStorage('')} className="space-y-2">
            {({ errors, processing, submit }) => (
                <>
                    <textarea
                        autoFocus
                        className="block h-full w-full resize-none overflow-hidden border-0 border-b bg-transparent pb-0 text-gray-800 focus:ring-0 focus:outline-0 dark:text-gray-200"
                        placeholder="What would you like to accomplish?"
                        name="intent"
                        onChange={handleInputChange}
                        maxLength={500}
                        value={value}
                        onKeyDown={(e) => handleKeyDown(e, submit)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    ></textarea>
                    <div className="flex items-center justify-between text-base text-gray-800 dark:text-gray-200">
                        <span className="tracking-wide">{`${characterCount}/500`}</span>
                        <span className="flex items-center space-x-2">
                            {showSaveText && <span>ctrl + enter</span>}
                            <Button disabled={processing} type="submit" size="lg" variant="secondary">
                                {processing ? <Spinner /> : 'Save'}
                            </Button>
                        </span>
                    </div>
                    <div>{errors.intent && <p className="text-red-500">{errors.intent}</p>}</div>
                </>
            )}
        </Form>
    );
}
