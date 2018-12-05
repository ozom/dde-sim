import { Component, OnInit , Inject} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-dde',
  templateUrl: './dde.component.html',
  styleUrls: ['./dde.component.scss']
})
export class DdeComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private http : HttpClient, private router: Router) { }

  public actuel_data : Object;
  public info : Object = {code_client: "", nom_client: "", segment: ""};
  public cle = "";
  public new_offre = [];
  public n = 1;

  check_state(){
        const state = this.storage.get("state")
        if (state["from"] == "details") {
            this.getData(state["cle"])
            this.new_offer(state["cle"])
            this.getInfo((state["cle"]))
            this.cle = state["cle"]
            this.storage.remove("state")
        } 

  }

  viewdetail(rowdata){
    this.storage.set("row", {"code_client":this.info['code_client'], "offre":rowdata["offre"]});
    this.router.navigate(['/details']);
    console.log("click done with : ", rowdata)
  }

  getData(key){
      this.actuel_data= [];
      console.log("valeur clé : ", this.cle)
    this.http.get("https://api-dde.herokuapp.com/statut_actuel/"+key) .subscribe(
      data => {
          console.log("Request is successful ", data);
          this.actuel_data = data
          console.log("actuel data : ", this.actuel_data)

      },
      error => {
          console.log("Error", error);
      }
  );  

  }

  new_offer(key){
     this.new_offre = [];
    console.log("valeur clé : ", this.cle)
  this.http.get("https://api-dde.herokuapp.com/new_offer/"+key) .subscribe(
    data => {
        //console.log("Request is successful ", data);
        this.new_offre.push({"info" : "engagement 24 mois et avec terminal", "donnee" : data})
        this.http.get("https://api-dde.herokuapp.com/new_offer3/"+key).subscribe(data => {
            this.new_offre.push({"info" : "engagement 24 mois et sans terminal", "donnee" : data})
                    //console.log("actuel data : ", this.actuel_data)
        this.http.get("https://api-dde.herokuapp.com/new_offer2/"+key).subscribe(data => {
            this.new_offre.push({"info" : "engagement 12 mois et avec terminal", "donnee" : data})
            this.http.get("https://api-dde.herokuapp.com/new_offer4/"+key).subscribe(data => {
                this.new_offre.push({"info" : "engagement 12 mois et sans terminal", "donnee" : data})
            })
        })
        })


    },
    error => {
        console.log("Error", error);
    }
);  

}

  getInfo(key){
    this.http.get("https://api-dde.herokuapp.com/info/"+key) .subscribe(
      data => {
          console.log("Request is successful ", data);
          this.info = data

      },
      error => {
          console.log("Error", error);
      }
  );  
  }

  ngOnInit() {
    this.check_state()

    }

}
