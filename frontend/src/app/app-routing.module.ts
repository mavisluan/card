import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FlashcardComponent} from "./components/flashcard/flashcard.component";
import {CardsComponent} from "./components/cards/cards.component";
import {SetsComponent} from "./components/sets/sets.component";
import {SetFormComponent} from "./components/set-form/set-form.component";
import {TestComponent} from "./components/test/test.component";
import {MatchComponent} from "./components/match/match.component";

const routes: Routes = [
  // Add path and components for routing
  {path: 'sets', component: SetsComponent},
  {path: 'sets/subject/:topic', component: SetsComponent, data: {isSearch: true}},
  {path: 'sets/new', component: SetFormComponent},
  {path: 'sets/:id', component: CardsComponent},
  {path: 'sets/:id/test', component: TestComponent},
  {path: 'sets/:id/match', component: MatchComponent},

  // // pass data through routes
  {path: 'sets/:id/edit', component: SetFormComponent, data: {isEdit: true}},
  {path: '**', component: SetsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
