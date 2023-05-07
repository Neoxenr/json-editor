// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Prizm UI
import { PrizmThemeService } from '@prizm-ui/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly theme: PrizmThemeService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.theme.update('dark');
  }
}
