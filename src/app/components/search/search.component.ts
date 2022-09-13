import { Component, OnInit } from '@angular/core';
import { Beer } from '@/types/beer.type';
import { PunkApiService } from '@/service/punk-api/punk-api.service';
import { StateService } from '@/service/state/state.service';

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


  search(searchValue: string, $event: Event) {
    $event.preventDefault();

    let value: string = searchValue

    if (searchValue === '') value = ' '

    this.punkApi.getBeers(value, this.state.pageNumber.toString()).subscribe(response => {
      const responseBody = response.body as Beer[];
      this.state.updateBeers(responseBody)
    });

    this.state.addToSearchList(value)
    this.searchValue = value
    this.state.updatePagination(1)
  }

  filterRecentSearches(value: string, $event: Event) {
    $event.preventDefault();

    this.state.filterSearchList(value)

    if (this.isSearchFocused === false) {
      this.isSearchFocused = true
    }
  }

  handleSearchFocus(value: boolean) {
    this.isSearchFocused = value
  }

}
