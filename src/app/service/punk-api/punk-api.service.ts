import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beer } from '../../types/beer.type';
import { catchError, retry } from 'rxjs/operators';
import { StateService } from 'src/app/service/state/state.service';

@Injectable({
  providedIn: 'root'
})
export class PunkApiService {

  constructor(private http: HttpClient, protected state: StateService) { }

  private path = 'https://api.punkapi.com/v2/beers';

  getBeers(pageNumber: number): Observable<HttpResponse<Beer[]>> {
    return this.http.get<Beer[]>(this.path + '?page=' + pageNumber + '&per_page=5', { observe: 'response' });
  }

  getBeersByName(name: string): Observable<HttpResponse<Beer[]>> {
    return this.http.get<Beer[]>(this.path + '?beer_name=' + name, { observe: 'response' });
  }
}
