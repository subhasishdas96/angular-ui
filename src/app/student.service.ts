
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:3000/api/students';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getStudent(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addStudent(student: any): Observable<any> {
    return this.http.post(this.apiUrl, student);
  }

  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}