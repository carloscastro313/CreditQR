import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(public AngularFirestore : AngularFirestore) { }

  getDoc(collection: string, document: string){
    return this.AngularFirestore.collection(collection).doc(document).get();
  }

  setDoc(collection: string, document: string, data: any){
    return this.AngularFirestore.collection(collection).doc(document).set(data);
  }

  modDoc(collection: string, document: string, data: any){
    return this.AngularFirestore.collection(collection).doc(document).update(data);
  }

  deleteDoc(collection: string, document: string, data: any){
    return this.AngularFirestore.collection(collection).doc(document).delete();
  }
}
