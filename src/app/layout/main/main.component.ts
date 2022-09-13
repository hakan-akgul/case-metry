import { Component, OnInit } from '@angular/core';
import { Beer } from '@/types/beer.type';
import { PunkApiService } from '@/service/punk-api/punk-api.service';
import { StateService } from '@/service/state/state.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private punkApi: PunkApiService, protected state: StateService) { }

  ngOnInit() {
    const search = window.location.search.split(/(\?beer_name=)(.*)(&page=)(.*)/gm)

    search[2]
      ? this.state.updateSearchValue(search[2])
      : this.state.updateSearchValue(' ')

    search[4]
      ? this.state.updatePageNumber(+search[4])
      : this.state.updatePageNumber(1)

    this.getBeers();
  }

  getBeers() {
    this.punkApi
      .getBeers(this.state.searchValue, this.state.pageNumber.toString())
      .subscribe(response => this.handleResponse(response));
  }

  handleResponse(response: HttpResponse<Beer[]>) {
    const responseBody = response.body;

    if (responseBody) {
      this.state.updateBeers(responseBody)
    }
  }

}
