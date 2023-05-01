// Angular
import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentComponent implements OnInit, OnDestroy {
  public id: string = '';

  public name = new FormControl('', Validators.required);

  public description = new FormControl('', Validators.required);

  public configuration = new FormControl('', Validators.required);

  private documentSubscription: Subscription | undefined;
  private updateSubscription: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this.documentSubscription = this.activatedRoute.paramMap
      .pipe(
        switchMap((params: ParamMap) => params.getAll('id')),
        mergeMap((id: string) => {
          this.id = id;

          return this.documentService.getById(id);
        })
      )
      .subscribe({
        next: (data: Document | undefined) => {
          this.name.setValue(data?.text);
          this.description.setValue(data?.description);
          this.configuration.setValue(data?.configuration);

          this.onIconClick('editor-auto');
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
        // поправишь
        if (!this.configuration.invalid) {
          this.configuration.setValue(
            JSON.stringify(JSON.parse(this.configuration.value), null, 2)
          );
        }

        break;
    }
  }

  onClickSave(): void {
    this.updateSubscription = this.documentService
      .update(this.id, {
        text: this.name.value,
        description: this.description.value,
        configuration: this.configuration.value,
      })
      .subscribe();
  }
}
