import { Component ,Input , OnInit } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  standalone: true,
  imports: [],
  templateUrl: './player-mobile.component.html',
  styleUrl: './player-mobile.component.scss'
})


export class PlayerMobileComponent implements OnInit{
  @Input() name: string;
  @Input() playerActive:boolean = false;

  constructor(){
    this.name= '';
  }
  ngOnInit(): void {

  }
}
