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

  selection_process: string;
  salary: number;


  thirtyDays: string;
  ninetyDays: string;
  //role_info.city
  oppurtunities: Oppurtunities = new Oppurtunities();

  oppurtunityID: Number = 6124;
  response: any;

  skillData: any;
  backgroundData: any;
  i: number = 0;
  data: any;
  constructor(private _service: OppurtunityService) { }

  ngOnInit() {
    this.getThirty();
    this.getNinety();

    this._service.getSkills()
      .subscribe(data => {
        console.log(data);
      })

    this._service.getBackgrounds()
      .subscribe(data => {
        console.log(data);
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
  enterPressed(value) {
    console.log(value)
    this.backgroundData = _.split(this.backgrounds, /\r|\r\n|\n/);
    if (value.keyCode == 13) {
      this.i++;
      // console.log("From 1st Loop" + this.i);
      if (this.i > 2 && this.backgroundData.length > 2) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      if (this.i >= 3) {
        this.i--;
      }
      // console.log("From 2nd Loop" + this.i)
      return true;
    }
  }

  //Method to PATCH the data to the server
  saveDetails(value) {
    this.oppurtunities.title = value.title;
    this.oppurtunities.applications_close_date = value.applications_close_date;
    this.oppurtunities.earliest_start_date = value.earliest_start_date;
    this.oppurtunities.latest_end_date = value.latest_end_date;
    this.oppurtunities.description = value.description;
    this.skillData = _.split(value.skills, /\r|\r\n|\n/);
    this.oppurtunities.skills = this.skillData;
    this.oppurtunities.selection_process = value.selection_process;
    this.oppurtunities.role_info.city = value.city

    this.data = {
      "access_token": "dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c",
      "opportunity": this.oppurtunities
    }

    this.backgroundData = _.split(value.backgrounds, /\r|\r\n|\n/);
    this.oppurtunities.backgrounds = this.backgroundData;
    this.backgroundOptions = value.backgroundOptions;
    this.skillsOptions = value.skillsOptions;


    console.log(JSON.stringify(this.oppurtunities.title))

    this._service.postOppurtunity(this.data, this.oppurtunityID)
      .subscribe(data => {
        this.response = data
      })

  }

}
