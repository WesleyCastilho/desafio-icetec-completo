import {DevService} from '../shared/dev.service';
import {Component, OnInit} from '@angular/core';
import {Dev} from '../shared/dev';
import {ActivatedRoute, Router} from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-dev-form',
  templateUrl: './dev-form.component.html',
  styleUrls: ['./dev-form.component.css']
})
export class DevFormComponent implements OnInit {
  dev: Dev = new Dev();
  title = 'Cadastrar Novo Dev';

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private devService: DevService
  ) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.devService.getById(id).subscribe(dev => {
        this.dev = dev;
        this.title = 'Alterando cadastro de Dev';
      });
    }
    this.dropdownList = [
      { item_id: 1, item_text: 'C#' },
      { item_id: 2, item_text: 'Javascript' },
      { item_id: 3, item_text: 'Nodejs' },
      { item_id: 4, item_text: 'Angular' },
      { item_id: 5, item_text: 'React' },
      { item_id: 6, item_text: 'Ionic' },
      { item_id: 7, item_text: 'Mensageria' },
      { item_id: 8, item_text: 'PHP' },
      { item_id: 9, item_text: 'Laravel' }
    ];
    this.selectedItems = this.dev.skills;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Selecionar todos',
      unSelectAllText: 'Limpar',
      itemsShowLimit: 5,
      allowSearchFilter: false
    };
  }
  onItemSelect(dev: any) {
    console.log(dev.skills);
  }
  onSelectAll(dev: any) {
    console.log(dev.skills);
  }

  onSubmit() {
    this.devService.save(this.dev).subscribe(dev => {
      console.log(dev);
      this.router.navigate(['']);
    });
  }
}
