export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    priority: string;
    status: 'To Do' | 'In Progress' | 'Done' | 'Testing' | 'Deployed';
}
