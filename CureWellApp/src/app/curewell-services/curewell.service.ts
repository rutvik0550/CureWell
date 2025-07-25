import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Doctor } from '../curewell-interfaces/doctor';
import { Specialization } from '../curewell-interfaces/specialization';
import { Surgery } from '../curewell-interfaces/surgery';

@Injectable({
  providedIn: 'root',
})
export class CurewellService {
  baseUrl: string = 'https://curewell.onrender.com/api/CureWell';

  constructor(private http: HttpClient) {}

  // Get all doctors
  getDoctors(): Observable<Doctor[]> {
    return this.http
      .get<Doctor[]>(this.baseUrl + '/GetDoctors')
      .pipe(catchError(this.handleError));
  }

  // Get all specializations
  getAllSpecializations(): Observable<Specialization[]> {
    return this.http
      .get<Specialization[]>(this.baseUrl + '/GetSpecializations')
      .pipe(catchError(this.handleError));
  }

  // Get today's surgeries
  getAllSurgeriesForToday(): Observable<Surgery[]> {
    return this.http
      .get<Surgery[]>(this.baseUrl + '/GetAllSurgeryTypeForToday')
      .pipe(catchError(this.handleError));
  }

  // Add a doctor
  addDoctor(doctorName: string): Observable<boolean> {
    let body: Doctor = {
      doctorId: 0,
      doctorName: doctorName,
    };
    return this.http
      .post<boolean>(this.baseUrl + '/AddDoctor', body)
      .pipe(catchError(this.handleError));
  }

  // Edit doctor details
  editDoctorDetails(doctorId: number, doctorName: string): Observable<boolean> {
    let body: Doctor = { doctorId: doctorId, doctorName: doctorName };
    return this.http
      .put<boolean>(this.baseUrl + '/UpdateDoctorDetails', body)
      .pipe(catchError(this.handleError));
  }

  // Edit a surgery
  editSurgery(
    doctorId: number,
    endTime: number,
    startTime: number,
    surgeryCategory: string,
    surgeryDate: string | Date,
    surgeryId: number,
  ): Observable<boolean> {
    let formattedDate: string;
    if (typeof surgeryDate === 'string') {
      formattedDate = surgeryDate.split('T')[0];
    } else {
      formattedDate = surgeryDate.toISOString().split('T')[0];
    }
    let body: Surgery = {
      doctorId: doctorId,
      endTime: endTime,
      startTime: startTime,
      surgeryCategory: surgeryCategory,
      surgeryDate: formattedDate,
      surgeryId: surgeryId,
    };
    return this.http
      .put<boolean>(this.baseUrl + '/UpdateSurgery', body)
      .pipe(catchError(this.handleError));
  }

  // Delete a doctor
  deleteDoctor(doctor: Doctor): Observable<boolean> {
    let httpOptions = {
      header: new HttpHeaders({ 'content-type': 'application/json' }),
      body: doctor,
    };
    return this.http
      .delete<boolean>(this.baseUrl + '/DeleteDoctor', httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Handle HTTP errors
  handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || 'Something went wrong');
  }
}
