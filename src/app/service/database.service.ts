import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { rejects } from 'node:assert';
import { resolve } from 'node:path';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private data: AngularFireDatabase,
    private file: AngularFireStorage
    ) { }

  getList(path: string) {
    return new Promise((resolve,rejects) => {
      this.data.list(path).valueChanges().subscribe(data =>{
        resolve(data);
      },
      (err) => {
        rejects(err);
      });
    });
  }

  getListD(path: string){
    return this.data.list(path).valueChanges();
  }

  getObject(path: string){
    return new Promise((resolve,rejects) => {
      this.data.object(path).valueChanges().subscribe(data =>{
        resolve(data);
      },
      (err) => {
        rejects(err);
      });
    });
  }

  updateList(path: string,data: any){
    return this.data.database.ref(path).update(data);
  }

  updateChild(path: string,data: any){
    return this.data.object(path).set(data);
  }

  createElement(path: string,data: any){
    return this.data.object(path).set(data);
  }

  uploadFile(path: string, element: any){
    return this.file.upload(path,element);
  }

  deleteFile(path: string){
    return new Promise((resolve, rejects) => {
      this.file.refFromURL(path).delete()
          .subscribe(
            data => resolve(data),
            err => rejects(err));
    });
  }

  updateFile(path: string, element: any){
    return new Promise((resolve, rejects) => {
      this.deleteFile(path)
          .then(() =>this.uploadFile(path,element)
                        .then(a => resolve(a)))
          .catch(err => rejects(err));
    });
  }
}
