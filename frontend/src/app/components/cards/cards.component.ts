import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SetService} from "../../services/set.service";
import {Set} from "../../models/Set";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  flashcard = false;
  showStars = false;
  activeCards = [];
  currentSet: Set;

  constructor(
    private setService: SetService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getSetById(params.get('id'));
    });
    // this.getAllCards();
  }

  getSetById(setId) {
    this.setService.getSet(setId).subscribe(set => {
      this.currentSet = set;
      this.activeCards = set.cards;
      console.log('on active', this.activeCards)
    })
  }

  getAllCards() {
    this.activeCards = this.currentSet.cards;
    this.showStars = false;
    console.log('all active', this.activeCards);
  }

  getStarCards() {
    this.activeCards = this.activeCards.filter(card => card.star === true);
    this.showStars = true;
    console.log('star active', this.activeCards);
  }

  toggleCardStar(setId, cardId) {
    let card = this.currentSet.cards.find(card => card._id === cardId);
    card.star = !card.star;
    if (!card.star) {
      this.onUpdateActiveCards();
    }
    this.setService.toggleCardStar(setId, cardId).subscribe(set => console.log(set));
  }

  onUpdateActiveCards() {
    (!this.showStars) ? this.getAllCards(): this.getStarCards();
  }
}
