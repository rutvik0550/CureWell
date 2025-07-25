import { Component, OnInit, DoCheck } from '@angular/core';
import { Doctor } from '../../curewell-interfaces/doctor';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  templateUrl: './view-doctor.component.html',
})
export class ViewDoctorComponent implements OnInit {
  doctorList: Doctor[] = [];
  showMsgDiv: boolean = false;
  doctorId: number = 0;
  errorMsg: string = '';
  status: boolean = false;

  constructor(
    private _curewellService: CurewellService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getDoctor();
  }

  getDoctor() {
    this._curewellService.getDoctors().subscribe(
      (Response) => {
        this.doctorList = Response;
        this.showMsgDiv = false;
      },
      (error) => {
        this.doctorList = [];
        this.showMsgDiv = false;
      },
      () => console.log('Doctors Details Fetched Successfully'),
    );
  }

  editDoctorDetails(doctor: Doctor) {
    this.router.navigate([
      'editDoctorDetails',
      doctor.doctorId,
      doctor.doctorName,
    ]);
  }

  removeDoctor(doctor: Doctor) {
    this._curewellService.deleteDoctor(doctor).subscribe(
      (Response) => {
        this.status = Response;
        if (this.status) {
          alert('Doctors Details Deleted Successfully!');
          this.ngOnInit();
        } else {
          alert('Doctor Details not Deleted!');
        }
      },
      (responceError) => {
        this.errorMsg = 'Some error occured';
      },
      () => {
        console.log('Remove Doctor details method executed successfully!');
      },
    );
  }
}
