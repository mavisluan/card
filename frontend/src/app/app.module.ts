import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsComponent } from './components/cards/cards.component';
import { FlashcardComponent } from './components/flashcard/flashcard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SetsComponent } from './components/sets/sets.component';
import { SetFormComponent } from './components/set-form/set-form.component';
import {SetService} from "./services/set.service";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { TestComponent } from './components/test/test.component';
import { MatchComponent } from './components/match/match.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    FlashcardComponent,
    NavbarComponent,
    SetsComponent,
    SetFormComponent,
    TestComponent,
    MatchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [SetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
