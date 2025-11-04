import { useDeleteGoalContext } from '@/hooks/goals/use-delete-goal-context';
import { destroy } from '@/routes/goals';
import { Form } from '@inertiajs/react';
import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

export function DeleteGoal() {
    const { goalToDelete, isOpen, setIsOpen } = useDeleteGoalContext();
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Goal</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this goal?
                        <span className="block py-2">{goalToDelete?.intent}</span>
                    </DialogDescription>
                </DialogHeader>
                {goalToDelete && (
                    <Form action={destroy(goalToDelete.id)} onSuccess={() => setIsOpen(false)} options={{ preserveScroll: true }}>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" variant="destructive">
                                Delete
                            </Button>
                        </DialogFooter>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
}
