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


  //Method to PATCH a oppurtunity
  postOppurtunity(data,id) : Observable<any>{
  return this.http.patch(this.updateOppurtunityUrl+'/'+id,data)
  }

  //Method to get the oppurtunities
  getOppurtunity() : Observable<any>{
   return this.http.get(this.updateOppurtunityUrl+'?'+this.token)
  }

  //Method to get Skills
  getSkills() : Observable<any> {
    return this.http.get(this.fillerUrl+'skills?'+this.token)
  }

  //Method to get Backgrounds
  getBackgrounds() : Observable <any> {
    return this.http.get(this.fillerUrl+'backgrounds?'+this.token)
  }
}
