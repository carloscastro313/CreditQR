import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { rejects } from 'node:assert';
import { DatabaseService } from './database.service';
import { path } from './variables';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private auth: AngularFireAuth,
    private db: DatabaseService
    ) { }

  login(correo: string,clave: string){
    return new Promise<void>(async (resolve,rejects) => {
      try {
        await this.auth.signInWithEmailAndPassword(correo,clave);
        const data: any = await this.db.getObject(path.usuario + correo.replace('.','_'));
        console.log(data);
        localStorage.setItem('id',data.uid);
        localStorage.setItem('correo',data.correo);
        localStorage.setItem('perfil',data.perfil);

        resolve();
      } catch (error) {
        rejects(error);
      }
      // this.auth.signInWithEmailAndPassword(correo,clave)
      // .then(() => {
      //   this.db.getObject(path.usuario + correo.replace('.','_'))
      //       .then((data: any) => {
      //         console.log(data);
      //         localStorage.setItem('id',data.uid);
      //         localStorage.setItem('correo',data.correo);
      //         localStorage.setItem('perfil',data.perfil);
      //         resolve();
      //       });
      // }).catch(rejects);
    });
  }

  signIn(data: any){
    return new Promise<void>(async (resolve,rejects) => {
      try {
        const {user} = await this.auth.createUserWithEmailAndPassword(data.correo,data.clave);
        const clave = data.clave;
        delete data.clave;
        data.uid = user.uid;
        await this.db.createElement(path.usuario+data.correo.replace(".","_"),data);
        await this.login(data.correo,clave);
        resolve();
      } catch (error) {
        rejects(error)
      }
      // this.auth.createUserWithEmailAndPassword(data.correo,data.clave)
      //     .then((dat)=>{
      //       const clave = data.clave;
      //       const correo = data.correo.replace(".","_");
      //       delete data.clave;
      //       data.uid = dat.user.uid;
      //       this.db.createElement(path.usuario+correo,data)
      //           .then(() => {
      //             this.login(data.correo,clave);
      //             resolve();
      //           });
      // })
      // .catch(rejects);
    });
  }

  logout(){
    return new Promise<void>(async (resolve,rejects) => {
      try {
        await this.auth.signOut();
        localStorage.clear();
        resolve();
      } catch (error) {
        rejects(error);
      }
    });
  }

  isLog(){
    let aux = localStorage.getItem('id');
    return aux;
  }
}
