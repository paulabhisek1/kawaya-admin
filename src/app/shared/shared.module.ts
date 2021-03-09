import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DatePipe } from '@angular/common';
import { MaterialModule } from './material.module';

@NgModule({
	imports: [
		PerfectScrollbarModule,
        MaterialModule
	],
	declarations: [

	],
	exports: [
		PerfectScrollbarModule,
        MaterialModule
	],
	providers: [
		DatePipe
	]
})
export class SharedModule { }
