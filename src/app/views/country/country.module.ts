import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryAddComponent } from './country-add/country-add.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CountryListComponent, CountryAddComponent],
  imports: [
    CommonModule,
    CountryRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class CountryModule { }
