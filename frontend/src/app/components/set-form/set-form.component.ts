import {Component, OnInit, ViewChild} from '@angular/core';
import {Set} from '../../models/Set';
import {Card} from "../../models/Card";
import {SetService} from "../../services/set.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-set-form',
  templateUrl: './set-form.component.html',
  styleUrls: ['./set-form.component.css']
})
export class SetFormComponent implements OnInit {
  isEdit: boolean = false;
  card: Card = {_id: '', term: '', definition: '', star: false };
  set = {
    _id: '',
    name: '',
    card1: {_id: '', term: '', definition: '', star: false },
    card2: {_id: '', term: '', definition: '', star: false },
    card3: {_id: '', term: '', definition: '', star: false },
    card4: {_id: '', term: '', definition: '', star: false },
    card5: {_id: '', term: '', definition: '', star: false },
  };

  @ViewChild('setForm') form: any;

  constructor(
    private setService: SetService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  //  get the Set by Id --> set it equal to this.set
    const {isEdit} = this.route.snapshot.data;

    if (isEdit) {
      this.isEdit = true;
      this.route.paramMap.subscribe(params => this.getSet(params.get('id')));
    }
  };

  addSet({value, valid}: { value: Set, valid: boolean }) {
    if (!valid) {
      console.log('Form is not valid');
    } else {
      console.log('value', value)
      this.setService.addSet( value as Set).subscribe(set => {
        console.log('set-form: add new', set);
        // this.newSet.emit(set);
      });
      // this.form.reset();
      this.router.navigateByUrl("/sets");
    }
  }

  getSet(id: string) {
    this.setService.getSet(id).subscribe(set => {
      console.log('get set', set);
      this.set._id = set._id;
      this.set.name = set.name;
      this.set.card1 = set.cards[0] ;
      this.set.card2 = set.cards[1] ;
      this.set.card3 = set.cards[2] ;
      this.set.card4 = set.cards[3] ;
      this.set.card5 = set.cards[4] ;

      console.log('thisset', this.set)
    });
  }
// updateSet function

  updateSet({value, valid}: { value: Set, valid: boolean }) {
    console.log('UPDATING')
    console.log(value);
    if (!valid) {
      console.log('Form is not valid');
    } else {
      this.setService.updateSet( value as Set).subscribe(set => {
        console.log('set-form: update set', set);
        // this.newSet.emit(set);
      });
      this.router.navigateByUrl("/sets");
      // this.form.reset();
    }
  }
}
