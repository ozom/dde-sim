import { Component, OnInit,Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public logged = false;
    public username = ""
    public password = ""

    constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private http : HttpClient, private router: Router) { }

    login(username, password){
        this.http.post("https://api-dde.herokuapp.com/login", {

        "username" : username,
        "password" : password
        }).subscribe(
            data => {
                this.logged = data['logged']
                if (data['logged'] == true ){
                    this.storage.set('logged', true)
                    this.storage.set('state', {"from":"login", "cle":""})
                    this.router.navigate(['/simulateur']);
                } else{
                    this.storage.set('logged', false)
                    this.storage.set('state', {"from":"login", "cle":""})
                }      
            },
            error => {
                console.log("Error", error);
            }
        ); 
        
    }

    ngOnInit() {
        this.logged =  this.storage.get('logged')
    }


}
