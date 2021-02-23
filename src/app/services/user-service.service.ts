import { Injectable } from '@angular/core';
import { HttpClient}  from '@angular/common/http';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  pegaCEP(cep: string) {
    throw new Error('Method not implemented.');
  }

  constructor(
    public http:HttpClient
  ) { }
  
  pegaCep(cep:string) {
    var local:string = "http://viacep.com.br/ws/"+cep+"/json/";
    return this.http.get<User>(local)
  }
}
