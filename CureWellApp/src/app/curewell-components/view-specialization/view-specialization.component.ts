import { Component, OnInit } from '@angular/core';
import { Specialization } from '../../curewell-interfaces/specialization';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Component({
  templateUrl: './view-specialization.component.html',
})
export class ViewSpecializationComponent implements OnInit {
  specializationList: Specialization[] = [];
  showMsgDiv: boolean = false;
  errorMsg: string = '';

  constructor(
    private _curewellService: CurewellService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getSpecialization();
  }

  getSpecialization() {
    this._curewellService.getAllSpecializations().subscribe(
      (Response) => {
        this.specializationList = Response;
      },
      (ResponseError) => {
        this.specializationList = [];
        this.errorMsg = ResponseError;
        this.showMsgDiv = false;
      },
      () => {
        console.log('Specialization fetched successfully');
      },
    );
  }
}
