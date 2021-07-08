import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../service/database.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastService } from '../service/toast.service';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  correo: string;
  saldoActual: number;
  error: any;
  perfil: string;
  flag: boolean = false;
  constructor(
    private DatabaseService: DatabaseService,
    private barcodeScanner: BarcodeScanner,
    private toast: ToastService,
    private elementRef: ElementRef
  ) {

   }

  ngOnInit() {
    this.correo = localStorage.getItem('correo');
    this.perfil = localStorage.getItem('perfil');
    this.update();
    console.log("ngOnInit");
  }

  async agregarSaldo(){
    try {
      this.flag = true;
      let scan = await this.barcodeScanner.scan();
      let {value, admin, usuarios}: any = await this.DatabaseService.getObject('creditos/'+scan.text.trim());

      if(value == null)throw "Código invalido";

      if(this.perfil != "admin"){
        if(usuarios != null && usuarios[this.correo.replace('.','_')]){
          throw new Error("Código ya utilizado");
        }else{
          await this.DatabaseService.updateList('creditos/'+scan.text.trim()+'/usuarios',{[this.correo.replace('.','_')]: true});
        }
      }else{
        if(admin != null){
          await this.updateAdminCredito(admin[this.correo.replace('.','_')],scan.text.trim());
        }else{
          this.updateAdminCredito(null,scan.text.trim());
        }

      }


      await this.DatabaseService.updateList('Usuarios/'+this.correo.replace('.','_'),{saldo: this.saldoActual + value});

      this.toast.presentToast(`Se a cargado $ ${value} a su saldo.`);

    } catch (error) {
      this.toast.presentToast(error);
    }finally{
      await this.update();
      this.flag = false;
    }
  }

  async update(){
    try {
      let usuario : any = await this.DatabaseService.getObject('Usuarios/'+this.correo.replace('.','_'));
      if(usuario.saldo){
        this.saldoActual = usuario.saldo;
      }else{
        this.saldoActual = 0;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateAdminCredito(cant, text){
    if(!cant)cant=0;
    switch(cant){
      case 0:
        await this.DatabaseService.updateList('creditos/'+text+'/admin',{[this.correo.replace('.','_')]: 1});
        break;
      case 1:
        await this.DatabaseService.updateList('creditos/'+text+'/admin',{[this.correo.replace('.','_')]: 2});
        break;
      default:
        throw "Código ya utilizado";
    }
  }

  async borrar(perfil){
    const qr = [
      '8c95def646b6127282ed50454b73240300dccabc',
      'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172',
      '2786f4877b9091dcad7f35751bfcf5d5ea712b2f'
    ]
    const setter = perfil == 'admin'? 0 : false;
    perfil = perfil == 'admin'?'admin':'usuarios';
    try {
      this.flag = true;
      qr.forEach(async data => {
        await this.DatabaseService.updateList('creditos/'+data+'/'+perfil,{[this.correo.replace('.','_')]: setter});
      });
      await this.DatabaseService.updateList('Usuarios/'+this.correo.replace('.','_'),{saldo: 0});
      this.toast.presentToast(`Se a reiniciado el saldo`);

    } catch (error) {

    }finally{
      await this.update();
      this.flag = false;
    }
  }

  ngOndestroy() {
    this.elementRef.nativeElement.remove();
  }

}
