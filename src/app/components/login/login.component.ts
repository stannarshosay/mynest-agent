import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from 'src/app/dialogs/forgot-password/forgot-password.component';
import { AgentService } from 'src/app/services/agent.service';
import { LoginService } from 'src/app/services/login.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogging:boolean = false;
  username = new FormControl("",Validators.required);
  password = new FormControl("",Validators.required);

  constructor(
    private snackBar: MatSnackBar,
    private loginService:LoginService,
    private socketService:SocketService,
    private agentService:AgentService,
    public dialog:MatDialog,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.isLogging = true;
    if(this.username.valid&&this.password.valid){
      this.loginService.login(this.username.value,this.password.value).subscribe(res =>{
        if(res["success"]){
          this.getAgentDetails(res["data"]["id"],res["message"]);         
        }else{
          this.isLogging = false;
          this.showSnackbar("Oops! "+res["message"]);
        }
      },
      error=>{
        this.isLogging = false;
        this.showSnackbar("Oops! "+error["error"]["message"]);
      });
    }else{
      this.isLogging = false;
      this.showSnackbar("Oops! no credentials entered");
    }
  }
  getAgentDetails(agentId:string,loginMessage:string){
    this.agentService.getDetailsByAgentId(agentId).subscribe(res =>{
      console.log(res);
      this.isLogging = false;
      if(res["success"]){
        localStorage.setItem("agentId",agentId);       
        localStorage.setItem("agentDistrict",res["data"]["location"]);
        localStorage.setItem("agentCode",res["data"]["rewardCode"]);
        this.loginService.hasLoggedIn.next(true);
        this.socketService.hasRecievedNotification.next("no");
        this.showSnackbar(loginMessage);
        this.router.navigate(["agents-vendors"]);
      }else{
        this.isLogging = false;
        this.showSnackbar("Oops! "+res["message"]);
      }
    },
    error=>{
      this.isLogging = false;
      this.showSnackbar("Oops! "+error["error"]["message"]);
    });

  }
  showSnackbar(content:string){
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = ['snackbar-styler'];
    this.snackBar.open(content, "close", config);
  }
  forgotPassword(){
    const dialogRef = this.dialog.open(ForgotPasswordComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log("forgot password closed");
    });
  }

}
