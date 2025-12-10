import { type CommentType } from '@/types';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
export interface DeleteCommentContextType {
    commentToDelete: CommentType | undefined;
    setCommentToDelete: React.Dispatch<React.SetStateAction<CommentType | undefined>>;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteCommentContext = createContext<DeleteCommentContextType | undefined>(undefined);
export function DeleteCommentProvider({ children }: PropsWithChildren) {
    const [commentToDelete, setCommentToDelete] = useState<CommentType | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);
    return <DeleteCommentContext value={{ commentToDelete, setCommentToDelete, isOpen, setIsOpen }}>{children}</DeleteCommentContext>;
}

export function useDeleteCommentContext() {
    const context = useContext(DeleteCommentContext);
    if (!context) {
        throw new Error('useDeleteCommentContext must be used within a DeleteCommentProvider');
    }
    const { commentToDelete, setCommentToDelete, isOpen, setIsOpen } = context;
    const deleteComment = (comment: CommentType) => {
        setCommentToDelete(comment);
        setIsOpen(true);
    };
    return { commentToDelete, setCommentToDelete, deleteComment, isOpen, setIsOpen };
}
