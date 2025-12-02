import { type GoalType } from '@/types';
import { createContext, useContext } from 'react';
export interface DeleteGoalContextType {
    goalToDelete: GoalType | undefined;
    setGoalToDelete: React.Dispatch<React.SetStateAction<GoalType | undefined>>;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteGoalContext = createContext<DeleteGoalContextType | undefined>(undefined);

export function useDeleteGoalContext() {
    const context = useContext(DeleteGoalContext);
    if (!context) {
        throw new Error('useDeleteGoalContext must be used within a DeleteGoalProvider');
    }
    return context;
}
