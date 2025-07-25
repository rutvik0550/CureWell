import { Component, OnInit } from '@angular/core';
import { Surgery } from '../../curewell-interfaces/surgery';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  templateUrl: './view-todays-surgery.component.html',
})
export class ViewTodaysSurgeryComponent implements OnInit {
  surgeryList: Surgery[] = [];
  showMsgDiv: boolean = false;
  errorMsg: string = '';

  constructor(
    private _curewellService: CurewellService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getTodaySurgery();
  }

  getTodaySurgery() {
    this._curewellService.getAllSurgeriesForToday().subscribe(
      (Response) => {
        this.surgeryList = Response;
      },
      (error) => {
        this.surgeryList = [];
        this.errorMsg = error;
        this.showMsgDiv = false;
      },
      () => {
        console.log('Surgery details fetched successfully!');
      },
    );
  }

  editSurgery(surgery: Surgery) {
    this.router.navigate([
      '/editSurgery',
      surgery.doctorId,
      surgery.endTime,
      surgery.startTime,
      surgery.surgeryCategory,
      surgery.surgeryDate,
      surgery.surgeryId,
    ]);
  }
}
