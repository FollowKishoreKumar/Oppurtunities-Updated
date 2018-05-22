import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OppurtunityService {

  constructor(private http: HttpClient) { }


  private updateOppurtunityUrl : string = 'http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/opportunities'
  private fillerUrl : string = 'http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/lists/'
  private token : string = 'access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c'

  postOppurtunity(data,id) : Observable<any>{
  return this.http.patch(this.updateOppurtunityUrl+'/'+id,data)
  }

  getOppurtunity() : Observable<any>{
   return this.http.get(this.updateOppurtunityUrl+'?'+this.token)
  }

  getSkills() : Observable<any> {
    return this.http.get(this.fillerUrl+'skills?'+this.token)
  }

  getBackgrounds() : Observable <any> {
    return this.http.get(this.fillerUrl+'backgrounds?'+this.token)
  }
// access_token: dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c
// opportunity[applications_close_date]: 2018-06-17
// opportunity[description]: Java Dev
// opportunity[skills][id]: Java
// opportunity[skills][option]: preferred
// opportunity[skills][level]: 1
// opportunity[measure_of_impacts][id]: 1
// opportunity[measure_of_impacts][option]: 1
// opportunity[nationalities][id]: India
// opportunity[nationalities][option]: preferred
// opportunity[backgrounds][id]: Database
// opportunity[backgrounds][option]: preferred
// opportunity[languages][id]: Tamil
// opportunity[languages][option]: preferred
// opportunity[languages][level]: 0
// opportunity[earliest_start_date]: 2018-06-17
// opportunity[latest_end_date]: 2018-06-17
// opportunity[specifics_info][salary]: 1200000
// opportunity[tm_details][tm_type]: internal
// opportunity[tm_details][open_to]: LC
}
