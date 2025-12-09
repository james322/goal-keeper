import { generate } from '@/routes/motivation';
import type { GoalType, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export function useGetMotivation(goal: GoalType) {
    const [motivation, setMotivation] = useState<string | null>(goal?.motivation?.motivation ?? null);
    const [busy, setBusy] = useState(false);
    const [collapsed, setCollapsed] = useState(true);
    const csrf_token = usePage<SharedData>().props.csrf_token;

    async function getMotivation() {
        if (busy) {
            return;
        }
        setBusy(true);
        try {
            const response = await fetch(generate(goal).url, {
                method: 'POST',
                headers: { 'X-CSRF-TOKEN': csrf_token },
            });

            const result = await response.json();

            setMotivation(result.message);
            setCollapsed(false);
        } catch (error) {
            console.error(error);
        } finally {
            setBusy(false);
        }
    }

    return {
        motivation,
        setMotivation,
        busy,
        collapsed,
        setCollapsed,
        getMotivation,
    };
}
