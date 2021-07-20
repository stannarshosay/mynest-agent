import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(
    private http:HttpClient
  ) { }
 
  getAllLocations(){
    return this.http.get("https://mynestonline.com/collection/api/locations");
  }
  getAllPlans(){
    return this.http.get("https://mynestonline.com/collection/api/membership-plans");
  } 
}
