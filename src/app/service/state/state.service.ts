import { Injectable } from '@angular/core';
import { Beer } from 'src/app/types/beer.type';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  public beers: Beer[] = []
  public pageNumber: number = 1
  public searchValue: string = ''
  public searchList: string[] = []
  public tempSearchList: string[] = []
  public xRateLimitRemaining: number = 3600

  public updateLimit(payload: any): void {
    if (payload < 10) {
      alert('10 request remaining')
    }

    if (payload === 1) {
      alert('No request remaining. Wait and try')
    }

    this.xRateLimitRemaining = payload
  }

  public updateBeers(payload: Beer[]): void {
    this.beers = payload
  }


  public updatePageNumber(payload: number): void {
    this.pageNumber = payload
  }

  public updatePagination(payload: number): void {
    this.pageNumber = payload
    this.updateBrowserHistory(this.searchValue)
  }

  public addToSearchList(payload: string): void {
    if (this.searchList.includes(payload) || payload === ' ' || payload === '') {
      this.updateBrowserHistory(payload)
      return
    }

    if (this.searchList.length >= 5) {
      this.searchList.pop()
    }

    this.searchList.unshift(payload)
    this.updatePagination(1)
    this.updateBrowserHistory(payload)

    localStorage.setItem('searchList', JSON.stringify(this.searchList))
  }

  public updateSearchList(payload: string[]): void {
    this.searchList = payload
  }

  public initTempSearchList(): void {
    this.tempSearchList = this.searchList
  }

  public updateSearchValue(payload: string): void {
    this.searchValue = payload
  }

  public filterSearchList(payload: string): void {
    this.tempSearchList = this.searchList.filter((searchItem) => searchItem.includes(payload))
  }

  public updateBrowserHistory(searchValue: string): void {
    this.searchValue = searchValue;

    history.pushState("", "", `?beer_name=${searchValue}&page=${this.pageNumber}`)
  }
}
