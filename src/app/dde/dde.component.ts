import { Component, ViewContainerRef,OnInit , Inject} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {ToastOptions} from 'ng2-toastr';

@Component({
  selector: 'app-dde',
  templateUrl: './dde.component.html',
  styleUrls: ['./dde.component.scss']
})
export class DdeComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private http : HttpClient,public toastr: ToastsManager, private router: Router,vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  public actuel_data : Object;
  public info : Object = {code_client: "", nom_client: "", segment: ""};
  public cle = "";
  public new_offre = [];
  public show = false
  public n = 1;
  public error_message = "";

  setMyStyles(it) {
    let styles = {
      'font-weight': it == 'TOTAL' ? 'bold' : 'normal'
    };
    return styles;
  }

  check_state(){
        const state = this.storage.get("state")
        if (state != null) {
        if (state["from"] == "details") {
            this.getData(state["cle"])
            this.new_offer(state["cle"])
            this.getInfo((state["cle"]))
            this.cle = state["cle"]
            this.storage.remove("state")
        } 
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
     this.error_message = "";
    this.http.get("https://api-dde.herokuapp.com/info/"+key) .subscribe(
      data => {
          console.log("Request is successful ", data);
          this.info = data
          console.log(Object.keys(this.info).length)
          if (Object.keys(this.info).length == 0) {
              this.error_message = "Le numéro client ou le code client fourni n'existe pas dans la base";
              this.toastr.warning('', "Code non conforme. Merci de vous rapprocher du marketing pour plus d’infos ", {positionClass: 'toast-top-center'});
          }

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
