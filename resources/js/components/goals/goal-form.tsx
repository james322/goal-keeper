import { useTextarea } from '@/hooks/goals/use-textarea';
import { store } from '@/routes/goals';
import { Form } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Spinner } from '../ui/spinner';
import { PublicTooltip } from './public-tooltip';
import { Textarea } from './textarea';

export function GoalForm() {
    const { characterCount, handleInputChange, handleKeyDown, setLocalStorage, setIsFocused, showSaveText, value } =
        useTextarea('goal-keeper.newGoal');
    const [isPublic, setIsPublic] = useState(false);
    return (
        <Form
            action={store()}
            resetOnSuccess
            disableWhileProcessing
            onSuccess={() => setLocalStorage('')}
            transform={(data) => ({ ...data, is_public: isPublic ? 1 : 0 })}
            className="space-y-2"
        >
            {({ errors, processing, submit }) => (
                <>
                    <Textarea
                        autoFocus
                        placeholder="What would you like to accomplish?"
                        name="intent"
                        onChange={handleInputChange}
                        maxLength={500}
                        value={value}
                        onKeyDown={(e) => handleKeyDown(e, submit)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    ></Textarea>
                    <div className="flex items-center justify-between text-base text-gray-800 dark:text-gray-200">
                        <span className="tracking-wide">{`${characterCount}/500`}</span>
                        <span className="flex items-center space-x-2">
                            {showSaveText && <span>ctrl + enter</span>}
                            <div className="flex space-x-4">
                                <span className="flex items-center space-x-2">
                                    <Checkbox
                                        value="1"
                                        name="is_public"
                                        id="is-public"
                                        checked={isPublic}
                                        onCheckedChange={(checked) => setIsPublic(!!checked)}
                                    />
                                    <Label htmlFor="is-public">Public</Label>
                                    <PublicTooltip />
                                </span>
                                <Button disabled={processing} type="submit" size="lg" variant="secondary">
                                    {processing ? <Spinner /> : 'Save'}
                                </Button>
                            </div>
                        </span>
                    </div>
                    <div>{errors.intent && <p className="text-red-500">{errors.intent}</p>}</div>
                </>
            )}
        </Form>
    );
}
