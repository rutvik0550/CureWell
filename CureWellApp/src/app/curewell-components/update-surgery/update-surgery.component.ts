import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Surgery } from '../../curewell-interfaces/surgery';

@Component({
  templateUrl: './update-surgery.component.html',
})
export class UpdateSurgeryComponent implements OnInit {
  doctorId: number = 0;
  surgeryId: number = 0;
  surgeryDate: Date = new Date();
  startTime: number = 0;
  endTime: number = 0;
  surgeryCategory: string = '';
  status: boolean = false;
  errorMsg: string = '';

  constructor(
    private route: ActivatedRoute,
    private _cureWellService: CurewellService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.doctorId = this.route.snapshot.params['doctorId'];
    this.surgeryCategory = this.route.snapshot.params['surgeryCategory'];
    this.surgeryDate = this.route.snapshot.params['surgeryDate'];
    this.surgeryId = this.route.snapshot.params['surgeryId'];
  }

  editSurgery(startTime: number, endTime: number) {
    this._cureWellService
      .editSurgery(
        this.doctorId,
        endTime,
        startTime,
        this.surgeryCategory,
        this.surgeryDate,
        this.surgeryId,
      )
      .subscribe({
        next: (response) => {
          this.status = response;
          if (this.status) {
            alert('Surgery updated successfully.');
            this.router.navigate(['/viewTodaySurgery']);
          }
        },
        error: (error) => {
          this.errorMsg = error;
          alert('Some error occurred while updating surgery.');
          this.router.navigate(['/viewTodaySurgery']);
        },
        complete: () => {
          console.log('Surgery update process completed.');
        },
      });
  }
}
