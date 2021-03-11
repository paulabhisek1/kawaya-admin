import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DatePipe } from '@angular/common';
import { MaterialModule } from './material.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
	imports: [
		PerfectScrollbarModule,
        MaterialModule,
		InfiniteScrollModule
	],
	declarations: [

	],
	exports: [
		PerfectScrollbarModule,
        MaterialModule,
		InfiniteScrollModule
	],
	providers: [
		DatePipe
	]
})
export class SharedModule { }
