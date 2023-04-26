// Angular
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
  public document: Document | undefined;

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
          this.document = data;
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
