import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Student } from "../types/Student";

@Injectable({ providedIn: 'root'})
export class StudentService {
    constructor ( private http: HttpClient) {


    }
    getAll(): any {
        return this.http.get<Student>('/api/students');
    }
}
