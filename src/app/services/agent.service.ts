import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  constructor(private http:HttpClient) { }

 
  getAllAnnouncements(){
    return this.http.get("https://mynestonline.com/collection/api/agent-announcements");
  }
  getDropdownVendors(district:string){
    return this.http.get("https://mynestonline.com/collection/api/vendor/location?district="+district);
  }
  addVendor(agentId:string,vendorId:string){
    // without request
    // return this.http.post("https://mynestonline.com/collection/api/agent/vendor/add?agentId="+agentId+"&vendorId="+vendorId,null);
    // let paramData = {};
    // paramData["vendorId"]= vendorId;
    // paramData["agentId"] = agentId;
    // paramData["requestType"]="addition";
    return this.http.post("https://mynestonline.com/collection/api/request?agentId="+agentId+"&vendorId="+vendorId+"&requestType=addition",null);
  }
  fetchVendorsByFilter(paramData:any,pageNo:number,pageSize:number){
    let api = "https://mynestonline.com/collection/api/agent/vendors?pageNo="+pageNo+"&pageSize="+pageSize+"&agentId="+paramData["id"];
    if(paramData["membershipName"]!=undefined){
      api = api + "&plan="+paramData["membershipName"];
    }
    if(paramData["verified"]!=undefined){
      api = api + "&verified="+paramData["verified"];
    }
    return this.http.get(api);
  }
  fetchVendorsBySearchTerm(agentId:string,term:any,pageNo:any,pageSize:any){
    return this.http.get("https://mynestonline.com/collection/api/agent/vendors/search?searchText="+term+"&pageNo="+pageNo+"&pageSize="+pageSize+"&agentId="+agentId);
  }
  deleteVendor(vendorId:string,agentId:string){
    return this.http.delete("https://mynestonline.com/collection/api/agent/vendor/delete?agentId="+agentId+"&vendorId="+vendorId);
  }
  getDetailsByVendorId(vendorId:string){
    return this.http.get("https://mynestonline.com/collection/api/agent/vendor?vendorId="+vendorId);
  }
  getDetailsByAgentId(agentId:string){
    return this.http.get("https://mynestonline.com/collection/api/agent?agentId="+agentId);
  }
}
