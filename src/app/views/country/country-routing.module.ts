import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';

const routes: Routes = [
  {
    path: '',
    component: CountryListComponent,
    data: {
      title: 'Country'
    },
    children: [
      {
        path: '',
        component: CountryListComponent,
        data: {
          title: 'Country List'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
