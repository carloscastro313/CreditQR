import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-votar',
  templateUrl: './votar.component.html',
  styleUrls: ['./votar.component.scss'],
})
export class VotarComponent {

  @Input() foto;
  @Output() onLike: EventEmitter<boolean> = new EventEmitter<any>()
  userLike : boolean = false;
  fecha: string = '';

  constructor() { }

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.foto);
    
    if(this.foto.like != null || undefined){
      const correo = localStorage.getItem('correo');
      let ar = [];
      this.userLike=this.foto.like.includes(correo);
    }

    this.fecha = new Date(this.foto.published).toISOString().substring(0,10);
  }

  like(){
    this.userLike = !this.userLike;
    this.onLike.emit(this.userLike);
  }
}
