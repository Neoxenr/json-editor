// Angular
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent implements OnInit {
  public requiredNameInputControl = new FormControl('', Validators.required);

  public requiredDescriptionInputControl = new FormControl('', Validators.required);

  public requiredTextareaControl = new FormControl('', Validators.required);

  constructor() {}

  ngOnInit(): void {}
}
