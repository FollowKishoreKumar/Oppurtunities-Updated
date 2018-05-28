import { Component, OnInit } from '@angular/core';
import { Oppurtunities } from './Ioppurtunities';
import { OppurtunityService } from '../oppurtunity.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-oppurtunity',
  templateUrl: './oppurtunity.component.html',
  styleUrls: ['./oppurtunity.component.css']
})
export class OppurtunityComponent implements OnInit {

  // Form Data for Oppurtunities  
  title: string;
  applications_close_date: Date;
  earliest_start_date: Date;
  latest_end_date: Date;
  description: string;

  backgrounds: Array<string>;
  backgroundObject: Object = [
    {
      "label": "Preferred",
      "value": "Preferred"
    },
    {
      "label": "Required",
      "value": "Required"
    },
  ]
  backgroundOptions: string;
  city: string;

  skills: Array<string>;
  skillsObject: Object = [
    {
      "label": "Preferred",
      "value": "Preferred"
    },
    {
      "label": "Required",
      "value": "Required"
    },
    {
      "label": "Featured",
      "value": "Featured"
    }
  ]
  skillsOptions: string;
  skillLevel: string;
  skillCollection: any[] = [];
  selection_process: string;
  salary: number;


  thirtyDays: string;
  ninetyDays: string;
  oppurtunities: Oppurtunities = new Oppurtunities();

  oppurtunityID: Number = 6124;
  response: any;
  oppurtunity: any;

  skillData: any = {
    "id": "",
    "option": "required",
    "level": "0"
  }

  backgroundCollection: any[] = [];
  backgroundData: any = {
    "id": "",
    "option": "required",
    "level": "0"
  }
  data: any;


  skillsPresent: any;
  backgroundsPresent: any;
  setLimit: boolean;

  postOppurtunity:boolean;
  viewOppurtunity:boolean;



  //Grid Contents
  columnDefs = [
    {headerName: 'Title', field: 'title' },
    {headerName: 'Applications Close Date', field: 'applications_close_date' },
    {headerName: 'Earliest Start Date', field: 'earliest_start_date'},
    {headerName: 'City', field: 'city'},
    {headerName: 'Duration', field: 'duration'},
    {headerName: 'Applications Count', field: 'applications_count'},
];

rowData : any;

  constructor(private _service: OppurtunityService) { }

  ngOnInit() {
    this.getThirty();
    this.getNinety();

    this._service.getSkills()
      .subscribe(data => {
        this.skillsPresent = data
      })

    this._service.getBackgrounds()
      .subscribe(data => {
        this.backgroundsPresent = data;
      })

    this._service.getOppurtunity()
      .subscribe(data => {
        this.rowData = data.data;
      })

  }

  //Method to get 30 + current Day
  getThirty(): string {
    return this.thirtyDays = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
  }

  //Method to get 90 + Current Days
  getNinety(): string {
    return this.ninetyDays = new Date(Date.now() + (90 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
  }

  //Method to Capture Enter event in Backgrounds Field 

  // enterPressed(value) {
  //   console.log(value)
  //   this.backgroundData = _.split(this.backgrounds, /\r|\r\n|\n/);
  //   if (value.keyCode == 13) {
  //     this.i++;
  //     if (this.i > 2 && this.backgroundData.length > 2) {
  //       return false;
  //     }
  //     else {
  //       return true;
  //     }
  //   }
  //   else {
  //     if (this.i >= 3) {
  //       this.i--;
  //     }
  //     return true;
  //   }
  // }


  //Method to set maximum 3 Backgrounds
  onBackgroundSelect() {
    if (this.backgrounds.length >= 3) {
      alert(" Maximum of three Backgrounds can only be set");
      // this.setLimit = true;
    }
    else {
      // this.setLimit = false;
    }
  }

  //Methods to set forms
post()
{
  this.postOppurtunity = true;
  this.viewOppurtunity = false;
}

view(){
  this.postOppurtunity = false;
  this.viewOppurtunity = true;
}
  //Method to PATCH the data to the server
  saveDetails(value) {

    this.backgrounds.forEach(element => {
      this.backgroundData = {
        "id": element,
        "option": "required",
        "level": "0"
      }
      this.backgroundCollection.push(this.backgroundData)
    });


    console.log(this.skills);
    this.skills.forEach(element => {
      this.skillData = {
        "id": element,
        "option": "required",
        "level": "0"
      }
      this.skillCollection.push(this.skillData)
    });


    this.oppurtunities.title = value.title;
    this.oppurtunities.applications_close_date = value.applications_close_date;
    this.oppurtunities.earliest_start_date = value.earliest_start_date;
    this.oppurtunities.latest_end_date = value.latest_end_date;
    this.oppurtunities.description = value.description;
    // this.skillData = _.split(value.skills, /\r|\r\n|\n/);
    this.oppurtunities.skills = this.skillCollection;
    this.oppurtunities.selection_process = value.selection_process;
    this.oppurtunities.role_info.city = value.city

    this.data = {
      "access_token": "dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c",
      "opportunity": this.oppurtunities
    }

    // this.backgroundData = _.split(value.backgrounds, /\r|\r\n|\n/);
    this.oppurtunities.backgrounds = this.backgroundCollection;
    this.backgroundOptions = value.backgroundOptions;
    this.skillsOptions = value.skillsOptions;


    console.log(JSON.stringify(this.oppurtunities.title))

    this._service.postOppurtunity(this.data, this.oppurtunityID)
      .subscribe(data => {
        this.response = data
        alert("Your Request was Posted Successfully :) ")
      },
        error => {
          alert(JSON.stringify(error))
        })

  }

}
