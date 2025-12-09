import { type GoalType } from '@/types';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
export interface DeleteGoalContextType {
    goalToDelete: GoalType | undefined;
    setGoalToDelete: React.Dispatch<React.SetStateAction<GoalType | undefined>>;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteGoalContext = createContext<DeleteGoalContextType | undefined>(undefined);
export function DeleteGoalProvider({ children }: PropsWithChildren) {
    const [goalToDelete, setGoalToDelete] = useState<GoalType | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);
    return <DeleteGoalContext value={{ goalToDelete, setGoalToDelete, isOpen, setIsOpen }}>{children}</DeleteGoalContext>;
}

export function useDeleteGoalContext() {
    const context = useContext(DeleteGoalContext);
    if (!context) {
        throw new Error('useDeleteGoalContext must be used within a DeleteGoalProvider');
    }
    const { goalToDelete, setGoalToDelete, isOpen, setIsOpen } = context;
    const deleteGoal = (goal: GoalType) => {
        setGoalToDelete(goal);
        setIsOpen(true);
    };
    return { goalToDelete, setGoalToDelete, deleteGoal, isOpen, setIsOpen };
}
