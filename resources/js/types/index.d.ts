import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    csrf_token: string;
    flash: {
        message: string | null;
        first_goal: 0 | 1;
    };
    [key: string]: unknown;
}

export interface ShowGoalData extends SharedData {
    goal: GoalType;
    comments: CommentsType;
    can: {
        update_goal: boolean;
        delete_goal: boolean;
    };
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface GoalType {
    id: string;
    intent: string;
    is_public: boolean;
    motivation: Motivation | null;
    completed: string | null;
    created_at: string;
    updated_at: string;
    user?: User;
    comments?: CommentType[];
}

export interface GoalsType {
    data: GoalType[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    total: number;
}

export interface CommentsType {
    data: CommentType[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    total: number;
}

export interface Motivation {
    id: string;
    motivation: string;
    created_at: string;
    updated_at: string;
}

export interface CommentType {
    id: string;
    user_id: string;
    goal_id: string;
    body: string;
    created_at: string;
    updated_at: string;
    user?: User | null;
    goal?: GoalType;
}
