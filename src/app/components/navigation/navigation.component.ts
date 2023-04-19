// Angular
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

// Prizm UI
import { INavigationTree } from '@prizm-ui/components';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  public requiredInputControl = new FormControl('', Validators.required);

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
    console.log('value :>> ', value);
  }
}
