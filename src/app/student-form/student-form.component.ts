import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent {
  
  studentForm: FormGroup;
  isEditMode: boolean = false; // Flag to indicate whether in edit mode
  studentId: any; // Store the student id
  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,private route: ActivatedRoute
  ) {
    this.studentForm = this.fb.group({
      userName: ['', Validators.required],
      age: ['', Validators.required],
      grade: ['', Validators.required],
      password: ['',Validators.required]
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('Query Params:', params);
      const id = params['id'];
      console.log('ID:', id);
      if (id) {
        this.isEditMode = true;
        this.studentId=id;
        this.loadStudents(id);
      }
    });
    
    // Retrieve the id from the query parameter
    // this.route.queryParams.subscribe(params => {
    //   const id = params['id'];
    //   if (id) {
    //     console.log(JSON.stringify(id));

    //    this.loadStudents(id);
    //   }
    // });
  }
  loadStudents(id:any) {
    this.studentService.getStudent(id).subscribe((data: any[]) => {
      this.studentForm.patchValue(data);
    });
  }
  // saveStudent() {
  //   if (this.studentForm.valid) {
  //     this.studentService.addStudent(this.studentForm.value).subscribe(() => {
  //       this.router.navigate(['/students']);
  //     });
  //   }
  // }
  // saveStudent(): void {
  //   const studentData = this.studentForm.value;
  //   if (this.isEditMode) {
  //     // If in edit mode, update existing student record
  //     this.studentService.updateStudent(this.studentId, studentData).subscribe(() => {
  //       // Handle success
  //       console.log('Student updated successfully!');
  //     }, error => {
  //       // Handle error
  //       console.error('Error updating student:', error);
  //     });
  //   } else {
  //     // If not in edit mode, create new student record
  //     this.studentService.addStudent(studentData).subscribe(() => {
  //       // Handle success
  //       console.log('Student created successfully!');
  //     }, error => {
  //       // Handle error
  //       console.error('Error creating student:', error);
  //     });
  //   }
  // }
  saveStudent(): void {
    const studentData = this.studentForm.value;
    if (this.isEditMode) {
      // If in edit mode, update existing student record
      this.studentService.updateStudent(this.studentId, studentData).subscribe(() => {
        // Handle success
        console.log('Student updated successfully!');
        // Redirect to the list page
        this.router.navigate(['/students']);
      }, error => {
        // Handle error
        console.error('Error updating student:', error);
      });
    } else {
      // If not in edit mode, create new student record
      this.studentService.addStudent(studentData).subscribe(() => {
        // Handle success
        console.log('Student created successfully!');
        // Redirect to the list page
        this.router.navigate(['/students']);
      }, error => {
        // Handle error
        console.error('Error creating student:', error);
      });
    }
}
}
