import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenreRoutingModule } from './genre-routing.module';
import { GenreListComponent } from './genre-list/genre-list.component';
import { GenreAddComponent } from './genre-add/genre-add.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [GenreListComponent, GenreAddComponent],
  imports: [
    CommonModule,
    GenreRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class GenreModule { }
