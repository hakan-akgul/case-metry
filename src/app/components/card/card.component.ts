import { Component, Input, OnInit } from '@angular/core';
import { Beer } from '@/types/beer.type';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  cardSide: boolean = true

  @Input()
  beer: Beer | null = null
}
