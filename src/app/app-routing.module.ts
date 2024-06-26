// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentListComponent } from './student-list/student-list.component';
const routes: Routes = [
  { path: 'add-student', component: StudentFormComponent }, // Route for adding a student
  { path: '', redirectTo: '/add-student', pathMatch: 'full' }, // Default route redirects to add-student
  { path: 'students', component: StudentListComponent }, // Default route redirects to add-student
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

