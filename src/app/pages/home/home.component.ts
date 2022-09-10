import { Component, OnInit } from '@angular/core';
import { PunkApiService } from '../../service/punk-api/punk-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public punkApiService: PunkApiService) { }

  ngOnInit(): void {
    // this.punkApiService.getBeers(2);
  }

}
