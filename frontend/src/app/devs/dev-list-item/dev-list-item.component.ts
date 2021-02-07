import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dev} from '../shared/dev';
import {DevService} from '../shared/dev.service';

@Component({
  selector: 'app-dev-list-item',
  templateUrl: './dev-list-item.component.html',
  styleUrls: ['./dev-list-item.component.css']
})
export class DevListItemComponent implements OnInit {
  @Input()
  dev: Dev;

  @Output()
  onDeleteDev = new EventEmitter();

  constructor(private devService: DevService) {
  }

  ngOnInit() {
  }

  remove(dev: Dev) {
    this.devService.delete(dev.id).subscribe(() => {
      this.onDeleteDev.emit(dev);
    });
  }

  onCompletedCheckChange(dev: Dev) {
    this.devService.save(dev).subscribe(dev => {
      console.log(dev);
    });
  }
}
