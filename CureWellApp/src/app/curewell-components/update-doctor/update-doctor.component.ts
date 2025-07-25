import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Doctor } from '../../curewell-interfaces/doctor';

@Component({
  templateUrl: './update-doctor.component.html',
})
export class UpdateDoctorComponent implements OnInit {
  doctorId: number = 0;
  doctorName: string = '';
  status: boolean = false;
  errorMsg: string = '';

  constructor(
    private route: ActivatedRoute,
    private _cureWellService: CurewellService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.doctorId = this.route.snapshot.params['doctorId'];
  }

  editDoctorDetails(doctorname: string) {
    this._cureWellService
      .editDoctorDetails(this.doctorId, doctorname)
      .subscribe(
        (Response) => {
          this.status = Response;
          if (this.status) {
            alert('Doctor details Updated Successfully');
            this.router.navigate(['/viewDoctors']);
          } else {
            alert('Doctor details are not Updated!');
          }
        },
        (responceError) => {
          this.errorMsg = responceError;
          alert('some Error Occured while updating Doctor Details');
          this.router.navigate(['/viewDoctors']);
        },
        () => {
          console.log('Updated doctor details successfully!');
        },
      );
  }
}
