import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Doctor } from '../../curewell-interfaces/doctor';
import { DoctorSpecialization } from '../../curewell-interfaces/doctorspecialization';
import { Specialization } from '../../curewell-interfaces/specialization';
import { Surgery } from '../../curewell-interfaces/surgery';
import { Router } from '@angular/router';

@Component({
  templateUrl: './add-doctor.component.html',
})
export class AddDoctorComponent implements OnInit {
  doctorId: number = 0;
  doctorName: string = '';
  status: boolean = false;
  errorAddMsg: string = '';
  showDiv: boolean = false;
  msg: string = '';
  toggleButton: boolean = true;

  constructor(
    private _curewellService: CurewellService,
    private router: Router,
  ) {}

  ngOnInit() {}

  addDoctor(doctorName: string) {
    this._curewellService.addDoctor(doctorName).subscribe({
      next: (response) => {
        this.status = response;
        if (this.status) {
          alert('Doctor added successfully.');
          this.router.navigate(['/viewDoctors']);
        }
      },
      error: (error) => {
        this.errorAddMsg = error;
        this.msg = 'some error occurred while adding doctor.';
        this.showDiv = true;
      },
      complete: () => {
        console.log('Doctor addition process completed.');
      },
    });
  }
}
