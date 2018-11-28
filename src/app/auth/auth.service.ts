import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Injectable } from '@angular/core';
import { Component, OnInit , Inject } from '@angular/core';

@Injectable()
export class AuthService {
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) { }


  public isAuthenticated(): boolean {
    const token = this.storage.get("logged");

    return token;
  }
}
