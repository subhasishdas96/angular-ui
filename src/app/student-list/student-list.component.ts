// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-student-list',
//   templateUrl: './student-list.component.html',
//   styleUrls: ['./student-list.component.scss']
// })
// export class StudentListComponent {

// }
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];

  constructor(private studentService: StudentService,private router: Router) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe((data: any[]) => {
      this.students = data;
    });
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }
  // editStudent(id: any): void {
  //   console.log('Original id type:', typeof id);
  //   const idParam = typeof id === 'object' ? id.toString() : id; // Convert id to string if it's an object
  //   console.log('Converted id type:', typeof idParam);
  //   this.router.navigate(['/add-student'], { queryParams: { id: idParam } });
  // }
  
  editStudent(id: any): void {
    console.log('Original id:', id);
    const idParam = typeof id === 'object' ? id.toString() : id; // Convert id to string if it's an object
    console.log('Converted id:', idParam);
    this.router.navigate(['/add-student'], { queryParams: { id: idParam } });
  }
  
  addStudent(){
    this.router.navigate(['/add-student']);
  }
}
