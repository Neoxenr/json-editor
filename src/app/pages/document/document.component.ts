// Angular
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// RxJS
import { Subscription } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';

// Services
import { DocumentService } from '../../services/document.service';

// Models
import { Document } from '../../models/document';
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.less'],
  providers: [DocumentService],
})
export class DocumentComponent implements OnInit, OnDestroy {
  public form: FormGroup = new FormGroup({
    text: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    configuration: new FormControl('{}', [
      Validators.required,
      this.configurationValidator.bind(this),
    ]),
  });

  public isLoading: boolean = false;
  public isSaving: boolean = false;

  private id: string = '';

  private parsedConfiguration: Object = {};

  private documentSubscription: Subscription | undefined;
  private updateSubscription: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this.documentSubscription = this.activatedRoute.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.isLoading = true;

          return params.getAll('id');
        }),
        mergeMap((id: string) => {
          this.id = id;

          return this.documentService.getById(id);
        })
      )
      .subscribe({
        next: (data: Document | undefined) => {
          this.form.reset();

          this.form.setValue({
            text: data?.text,
            description: data?.description,
            configuration: data?.configuration,
          });

          this.onIconClick('editor-auto');

          this.isLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.documentSubscription?.unsubscribe();

    this.updateSubscription?.unsubscribe();
  }

  onIconClick(iconName: string): void {
    switch (iconName) {
      case 'editor-auto':
        if (!this.form.controls['configuration'].invalid) {
          this.form.setValue({
            ...this.form.value,
            configuration: JSON.stringify(this.parsedConfiguration, null, 2),
          });
        }
        break;
    }
  }

  onClickSave(): void {
    this.isSaving = true;

    this.updateSubscription = this.documentService
      .update(this.id, this.form.value)
      .subscribe({ next: () => (this.isSaving = false) });
  }

  configurationValidator(
    control: FormControl
  ): { [field: string]: boolean } | null {
    try {
      this.parsedConfiguration = JSON.parse(control.value);

      return null;
    } catch (exception) {
      return { configuration: true };
    }
  }
}
