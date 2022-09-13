import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beer } from '@/types/beer.type';
import { catchError, retry } from 'rxjs/operators';
import { StateService } from '@/service/state/state.service';

@Injectable({
  providedIn: 'root'
})
export class PunkApiService {

  constructor(private http: HttpClient, protected state: StateService) { }

  private path = 'https://api.punkapi.com/v2/beers';

  getBeers(name: string, pageNumber: string): Observable<HttpResponse<Beer[]>> {
    return this.http.get<Beer[]>(this.path + '?beer_name=' + name + '&page=' + pageNumber, { observe: 'response' });
  }
}
