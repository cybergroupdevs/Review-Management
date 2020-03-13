import { RoleGuardService } from './guards/role-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { HeaderComponent } from './header/header.component';
import { ReviewTableComponent } from './review-table/review-table.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { CreateReviewComponent } from './create-review/create-review.component';
import { ReviewNavbarComponent } from './review-navbar/review-navbar.component';
import { SelfReviewComponent } from './self-review/self-review.component';
import { ReviewerReviewComponent } from './reviewer-review/reviewer-review.component';
import { ReviewerQaerComponent } from './reviewer-qaer/reviewer-qaer.component';
import { AdminOptionsComponent } from './admin-options/admin-options.component';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';
import { AddUserComponent} from './add-user/add-user.component';
import { AdminCrudComponent } from './admin-crud/admin-crud.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UpdatePersonalInfoComponent} from './update-personal-info/update-personal-info.component';


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "404", component: ErrorPageComponent},
  { path: "user", canActivate: [AuthGuardService, RoleGuardService], data: {role: "User"}, component: HeaderComponent, children: [
    {
      path: "", redirectTo: "profile", pathMatch:"full"
    },
    {
      path: "profile", component: AddUpdateUserComponent
    },
    {
      path: "pendingByReviewer/edit/:id", component: ReviewerReviewComponent
    },
    {
      path: "pendingBySelf/edit/:id", component: SelfReviewComponent
    },
    {
      path: "pendingByQa/edit/:id", component: ReviewerReviewComponent
    },
    {
      path: "closed/:id", component: ReviewerReviewComponent
    },
    {
      path: "reviews", component: ReviewNavbarComponent, children: [
        {
          path: "", redirectTo: "allReviews", pathMatch: "full"
        },
        {
          path: "allReviews", component: ReviewTableComponent
        },
        {
          path: "pendingByReviewer", component:  ReviewTableComponent
        },
        {
          path: "pendingByQAer", component: ReviewTableComponent
        },
        {
          path: "closed", component: ReviewTableComponent
        }
      ]
    }
  ]},


  { path: "admin", canActivate: [AuthGuardService, RoleGuardService], data: {role: "ADMIN"},component: AdminMainComponent, children: [
    {
      path: "", redirectTo: "home", pathMatch: 'full'
    },
    {
      path: "home", component: AdminOptionsComponent
    },
    {
      path: "profile", component: AddUpdateUserComponent
    },
    {
      path: "review", component: CreateReviewComponent
    },
    {
      path: "employee/edit/:id", component: AddUpdateUserComponent
    },
    {
      path: "employees", component: AdminCrudComponent
    },
    {
      path: "newEmployee", component: AddUserComponent
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents=[AdminCrudComponent]
