import { Injectable } from '@angular/core';
import { Beer } from 'src/app/types/beer.type';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  public beers: Beer[] = []
  public pageNumber: number = 1
  public searchList: string[] = []

  public updateBeers(payload: Beer[]): void {
    this.beers = payload
  }

  public updatePagination(payload: number): void {
    this.pageNumber = payload
  }

  public addToSearchList(payload: string): void {
    if (this.searchList.includes(payload)) {
      return
    }

    if (this.searchList.length >= 5) {
      this.searchList.pop()
    }

    this.searchList.unshift(payload)
    localStorage.setItem('searchList', JSON.stringify(this.searchList))
  }

  public updateSearchList(payload: string[]) {
    this.searchList = payload
  }
}
