import {Component, OnInit} from '@angular/core';
import {SetService} from "../../services/set.service";
import {ActivatedRoute, Route} from "@angular/router";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  cards = [];
  currentSetId = '';
  answers = ['', '', '', '', ''];
  score = 0;
  showScore = false;
  constructor(private setService: SetService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.currentSetId = params.get('id');
      this.getSet(params.get('id'));
    })
  }

  getSet(setId) {
    this.setService.getSet(setId).subscribe(set => {
      // get currentSet cards --> shuffle cards for test
      this.cards = this.shuffleCards(set.cards);
    });
  }

  shuffleCards(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  submitTest(answers) {
    for (let i = 0; i < this.cards.length; i++) {

      console.log(answers[i] == this.cards[i].definition);
      if (answers[i] == this.cards[i].definition) {
        this.score ++;
      }
    }
    this.showScore = true;
  }

  reset() {
    this.answers = ['', '', '', '', ''];
    this.showScore = false;
    this.score = 0;

    console.log('showScore', this.showScore)
  }

  toggleCardStar(setId, cardId) {
    let card = this.cards.find(card => card._id === cardId);
    card.star = !card.star;
    this.setService.toggleCardStar(setId, cardId).subscribe(set => console.log(set));
  }
}
