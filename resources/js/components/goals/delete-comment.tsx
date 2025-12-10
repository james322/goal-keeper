import { useDeleteCommentContext } from '@/hooks/comments/use-delete-comment-context';
import { destroy } from '@/routes/comments';
import { Form } from '@inertiajs/react';
import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

export function DeleteComment() {
    const { commentToDelete, isOpen, setIsOpen } = useDeleteCommentContext();
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Comment</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this comment?
                        <span className="block py-2">{commentToDelete?.body}</span>
                    </DialogDescription>
                </DialogHeader>
                {commentToDelete && (
                    <Form
                        action={destroy(commentToDelete.id)}
                        onSuccess={() => setIsOpen(false)}
                        options={{ preserveScroll: true }}
                        disableWhileProcessing
                    >
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
