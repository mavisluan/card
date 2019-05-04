import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  content = '';
  @ViewChild('searchForm') searchForm: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onSearch(content) {
    this.content = content;
    this.router.navigateByUrl(`/sets/subject/${this.content}`);
    this.content = '';
  }
}
