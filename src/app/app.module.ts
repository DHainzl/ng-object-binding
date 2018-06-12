import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, Sub1Component, Sub2Component } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        Sub1Component,
        Sub2Component,
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
