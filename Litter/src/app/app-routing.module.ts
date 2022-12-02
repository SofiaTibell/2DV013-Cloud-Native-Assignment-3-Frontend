import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component'
import { SandboxComponent } from './sandbox/sandbox.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sandbox',
    component: SandboxComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cats',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
