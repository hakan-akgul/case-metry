import { Component, Input, OnInit } from '@angular/core';
import { Beer } from 'src/app/types/beer.type';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  beer:Beer|null=null
}
