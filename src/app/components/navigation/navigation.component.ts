import { Component, OnInit } from '@angular/core';
import { INavigationTree } from '@prizm-ui/components';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less'],
})
export class NavigationComponent implements OnInit {
  public data: INavigationTree[] = [
    { title: 'Документ 1' },
    { title: 'Документ 2' },
    { title: 'Файл 3' },
    { title: 'Файл 4' },
    { title: 'Файл 4' },
    { title: 'Файл 4' },
    { title: 'Файл 4' },
  ];

  constructor() {}

  ngOnInit(): void {}

  public search(value: string): void {
    console.log('search', value);
  }
}
