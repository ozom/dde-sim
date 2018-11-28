import { Component, OnInit , Inject} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-dde',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class details implements OnInit {

    constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private http : HttpClient, private router: Router) { }

    data_received = this.storage.get("row")
    public detail : object;
    public column = []

  ngOnInit() {
      
    this.http.post("https://api-dde.herokuapp.com/details", this.data_received).subscribe(
        data => {
            this.detail = data
            this.column = Object.keys(this.detail[0])
            console.log("detail from api : ", data)
  
        },
        error => {
            console.log("Error", error);
        }
    );  
  
    }
  }
