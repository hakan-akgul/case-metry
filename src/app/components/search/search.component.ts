import { Component, OnInit } from '@angular/core';
import { Beer } from 'src/app/types/beer.type';
import { PunkApiService } from '../../service/punk-api/punk-api.service';
import { StateService } from 'src/app/service/state/state.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private punkApi: PunkApiService, protected state: StateService) { }

  ngOnInit(): void {
    const searchListOnStorage = localStorage.getItem('searchList')

    if (searchListOnStorage) {
      const searchList = JSON.parse(searchListOnStorage)
      this.state.updateSearchList(searchList)
      this.state.initTempSearchList()
    }
  }

  protected isSearchFocused: boolean = false
  protected searchValue: string = ''


  search(value: string, $event: Event) {
    $event.preventDefault();

    if (value === '') {
      return
    }

    this.punkApi.getBeersByName(value).subscribe(response => {
      const responseBody = response.body as Beer[];
      this.state.updateBeers(responseBody)
    });

    this.state.addToSearchList(value)
    this.searchValue = value
  }

  filterRecentSearches(value: string, $event: Event) {
    $event.preventDefault();

    this.state.filterSearchList(value)
  }

  handleSearchFocus(value: boolean) {
    this.isSearchFocused = value
  }

}
