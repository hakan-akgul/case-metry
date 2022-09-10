import { Component, OnInit } from '@angular/core';
import { Beer } from 'src/app/types/beer.type';
import { PunkApiService } from '../../service/punk-api/punk-api.service';
import { StateService } from 'src/app/service/state/state.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private punkApi: PunkApiService, protected state: StateService) { }

  ngOnInit() {
    this.getBeers();
  }

  getBeers() {
    this.punkApi.getBeers(this.state.pageNumber).subscribe(response => {
      const responseBody = response.body;
      const limit = response.headers.get('x-ratelimit-remaining')

      if (responseBody) {
        this.state.updateBeers(responseBody)
      }

      if (limit) {
        this.state.updateLimit(limit)
      }

    });
  }

}
