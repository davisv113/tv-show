import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvShowDetailsComponent } from './module/tv-show-details/tv-show-details.component';

const routes: Routes = [
  { path: 'serie', component: TvShowDetailsComponent },
  { path: '', redirectTo: 'serie', pathMatch: 'full' },
  { path: '**', redirectTo: 'serie' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
