import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenreAddComponent } from './genre-add/genre-add.component';
import { GenreListComponent } from './genre-list/genre-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Genre'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: GenreListComponent,
        data: {
          title: 'Genre List'
        },
      },
      {
        path: 'add',
        component: GenreAddComponent,
        data: {
          title: 'Genre Add'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenreRoutingModule { }
