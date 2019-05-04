import {Component, OnInit} from '@angular/core';
import {SetService} from "../../services/set.service";
import {Set} from "../../models/Set";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css']
})
export class SetsComponent implements OnInit {
  sets: Set[] = [];

  constructor(private setService: SetService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const {isSearch} = this.route.snapshot.data;

    if (isSearch) {
      this.route.paramMap.subscribe(params => this.getSetsByName(params.get('topic')));
    } else {
      this.getAllSets();
    }
  }

  getAllSets() {
    this.setService.getSets().subscribe(sets => {
      this.sets = sets;
      console.log(this.sets)
    });
  }

  deleteSet(setId) {
    this.setService.removeSet(setId).subscribe(set => console.log(`${set} Deleted`));
    this.sets = this.sets.filter( set => set._id !== setId);
  }

  getSetsByName(topic) {
    this.setService.getSetsByName(topic).subscribe(sets => this.sets = sets);
  }
}
