import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getDetalhesSeries() {
    return this.http.get<any>(`${environment.tvShowsURL}`);
  }

  getTemporadasEpisodios() {
    return this.http.get<any>(`${environment.episodesURL}`);
  }
}
