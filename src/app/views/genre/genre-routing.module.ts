import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenreListComponent } from './genre-list/genre-list.component';

const routes: Routes = [
  {
    path: '',
    component: GenreListComponent,
    data: {
      title: 'Genre'
    },
    children: [
      {
        path: '',
        component: GenreListComponent,
        data: {
          title: 'Genre List'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenreRoutingModule { }
