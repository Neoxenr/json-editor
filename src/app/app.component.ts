import { Component, OnInit } from '@angular/core';
import { PrizmThemeService } from '@prizm-ui/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'json-editor';

  constructor(public readonly theme: PrizmThemeService) {}

  ngOnInit(): void {
    this.theme.update('dark');
  }
}
