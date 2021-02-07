import {DevService} from '../shared/dev.service';
import {Component, OnInit} from '@angular/core';
import {Dev} from '../shared/dev';

@Component({
  selector: 'app-dev-list',
  templateUrl: './dev-list.component.html',
  styleUrls: ['./dev-list.component.css']
})
export class DevListComponent implements OnInit {
  devs: Dev[] = [];

  constructor(private devService: DevService) {
  }

  ngOnInit() {
    this.devService.getAll().subscribe(devs => {
      this.devs = devs;
    });
  }

  onDevDeleted(dev: Dev) {
    if (dev) {
      const index = this.devs.findIndex((devItem) => devItem.id === dev.id);
      this.devs.splice(index, 1);
    }
  }
}
