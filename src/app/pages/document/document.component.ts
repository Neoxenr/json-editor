// Angular
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
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
  public nameControl = new FormControl('', Validators.required);

  public descriptionControl = new FormControl('', Validators.required);

  public configurationControl = new FormControl('', Validators.required);

  private subscription: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.paramMap
      .pipe(
        switchMap((params: ParamMap) => params.getAll('id')),
        mergeMap((id: string) => this.documentService.getDocumentById(id))
      )
      .subscribe({
        next: (data: Document | undefined) => {
          this.nameControl.setValue(data?.name);
          this.descriptionControl.setValue(data?.description);
          this.configurationControl.setValue(data?.configuration);
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onIconClick(iconName: string): void {
    switch (iconName) {
      case 'editor-auto':
        this.configurationControl.setValue(
          JSON.stringify(JSON.parse(this.configurationControl.value), null, 2)
        );

        break;
    }
  }
}
