import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../models/user";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  pegaCEP(cep: string) {
    throw new Error('Method not implemented.');
  }

  constructor(
    public http: HttpClient,
    private firedb: AngularFirestore
  ) { }

  pegaCep(cep: string) {
    var local: string = "http://viacep.com.br/ws/" + cep + "/json/";
    return this.http.get<User>(local)
  }

  add(usuario: User) {
    return this.firedb.collection<User>("usuarios").add(usuario)
  }

}
