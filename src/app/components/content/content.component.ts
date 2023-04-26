// Angular
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent implements OnInit {
  @Input() name: string | undefined = '';

  @Input() description: string | undefined = '';

  @Input() configuration: string | undefined = '';

  public requiredNameInputControl = new FormControl('', Validators.required);

  public requiredDescriptionInputControl = new FormControl(
    '',
    Validators.required
  );

  public requiredTextareaControl = new FormControl('', Validators.required);

  constructor() {}

  ngOnInit(): void {}
}
