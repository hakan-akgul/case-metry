import { Component, OnInit } from '@angular/core';
import { Beer } from 'src/app/types/beer.type';
import { PunkApiService } from 'src/app/service/punk-api/punk-api.service';
import { StateService } from 'src/app/service/state/state.service';
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
    console.log('splitedSearch', search)

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
    const limit = response.headers.get('x-ratelimit-remaining')

    if (responseBody) {
      this.state.updateBeers(responseBody)
    }

    if (limit) {
      this.state.updateLimit(limit)
    }
  }

}
