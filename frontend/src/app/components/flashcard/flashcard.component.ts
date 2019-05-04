import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SetService} from "../../services/set.service";

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {
  @Input() activeCards;
  @Input() currentSet;
  @Input() showStars;
  @Output() updateActiveCards = new EventEmitter(this.activeCards);

  showTerm: boolean = true;

  index = 0;
  currentCard = {};

  constructor(private setService: SetService) { }

  ngOnInit() {
    console.log(this.activeCards);
    this.currentCard = this.activeCards[0];
  }

  showLast() {
    this.index = (this.index == 0 ? this.activeCards.length -1 : this.index - 1);
    this.currentCard = this.activeCards[this.index];
  }

  showNext() {
    this.index = (this.index == this.activeCards.length -1 ? 0 : this.index + 1);

    this.currentCard = this.activeCards[this.index];
  }

  toggleCardStar(setId, cardId) {
    let card = this.currentSet.cards.find(card => card._id === cardId);
    card.star = !card.star;
    if (!card.star) {
      this.showStars && (this.activeCards = this.activeCards.filter(card => card.star === true));
      this.showNext();
    }
    this.setService.toggleCardStar(setId, cardId).subscribe(set =>this.updateActiveCards.emit());

  }

}
