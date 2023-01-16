import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { AuthGuard } from './guards/auth.guard';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ProfileComponent } from './profile/profile.component'
import { SandboxComponent } from './sandbox/sandbox.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'profile',
    component: MyProfileComponent,
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
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
