import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor() { }

  playAudio(src : string){
    const audio = new Audio();
    audio.src = src;
    audio.load();
    audio.play();
  }
}
