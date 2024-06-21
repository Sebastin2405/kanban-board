import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { RegisterComponent } from './register/register.component';
import { KanbanModalsComponent } from './kanban-modals/kanban-modals.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'signup', component: RegisterComponent
    },
    {
        path: 'kanban-board', component: KanbanBoardComponent
    },
    {
        path: '**', redirectTo: '/login'
    },
    { path: 'edit-task/:id', component: KanbanModalsComponent },
];
