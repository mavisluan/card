import { Component, OnInit } from '@angular/core';
import {Card} from "../../models/Card";
import {SetService} from "../../services/set.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  cards: Card[] = [];
  currentSetId = '';
  terms = [];
  defs = [];
  termIdx = null;
  defIdx = null;

  constructor(private setService: SetService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.currentSetId = params.get('id');
      this.getSet(params.get('id'));
      this.generateCards();
    })
  }

  getSet(setId) {
    this.setService.getSet(setId).subscribe(set => {
      this.cards = set.cards;

      console.log('terms', this.terms);
      console.log('defs', this.defs);
    });
  }

  generateCards() {
    this.terms = this.generateRandomIdx(this.terms);
    this.defs = this.generateRandomIdx(this.defs);
  }

  generateRandomIdx(items) {
    while(items.length < 5) {
      let index = this.getRandomInt(5);
      if(items.indexOf(index) === -1) {
        items.push(index);
      }
    }

    return items;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  setTermIdx(index) {
    this.termIdx = index;
    this.compare();
  }

  setDefIdx(index) {
    this.defIdx = index;
    this.compare();
  }

  compare() {
    if (this.termIdx !== null && this.defIdx !== null) {
      if (this.termIdx === this.defIdx) {
        console.log('match');
        this.terms = this.terms.filter(idx => idx !== this.termIdx);
        this.defs = this.defs.filter(idx => idx !== this.defIdx);
      } else {
        console.log('not match')
      }
      this.termIdx = null;
      this.defIdx = null;
    }
  }
}
