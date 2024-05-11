// tv-show-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.scss'],
})
export class TvShowDetailsComponent implements OnInit {
  serie: any = {};
  temporadasEpisodios: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.carregarDetalhesSerie();
    this.carregarTemporadasEpisodios();
  }

  carregarDetalhesSerie() {
    this.apiService.getDetalhesSeries().subscribe((data: any) => {
      this.serie = data;
    });
  }

  carregarTemporadasEpisodios() {
    this.apiService.getTemporadasEpisodios().subscribe((data: any[]) => {
      if (Array.isArray(data)) {
        this.temporadasEpisodios = this.organizarTemporadasEpisodios(data);
      }
    });
  }

  organizarTemporadasEpisodios(episodios: any[]): any[] {
    const temporadas: any[] = [];
    episodios.forEach((episodio) => {
      if (episodio) {
        const temporadaIndex = episodio.SeasonNumber - 1;
        if (!temporadas[temporadaIndex]) {
          temporadas[temporadaIndex] = {
            temporada: episodio.SeasonNumber,
            episodios: [episodio],
          };
        } else {
          temporadas[temporadaIndex].episodios.push(episodio);
        }
      }
    });
    console.log('temporadas', temporadas);
    return temporadas;
  }

  openTab(event: any, tabName: string) {
    let i;
    const tabcontent: HTMLElement[] = Array.from(document.getElementsByClassName('tabcontent') as HTMLCollectionOf<HTMLElement>);
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    const tablinks: HTMLElement[] = Array.from(document.getElementsByClassName('tablinks') as HTMLCollectionOf<HTMLElement>);
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(tabName)?.classList.add('show');
    event.currentTarget.className += ' active';
  }
}
