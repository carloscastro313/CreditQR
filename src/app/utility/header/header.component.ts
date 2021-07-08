import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo: string = '';
  @Input() route: string = null;
  @Input() color: string = '';

  constructor() { }

  ngOnInit() {}

}
