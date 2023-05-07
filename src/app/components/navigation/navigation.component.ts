// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

// RxJS
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Models
import { Document } from '../../models/document';
import { CustomItem } from '../../models/custom-item';

// Services
import { DocumentService } from '../../services/document.service';
import { RequestErrorHandlerService } from '../../services/request-error-handler.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  public items: CustomItem[] = [];

  public allItems: CustomItem[] = [];

  public isLoading: boolean = false;

  private getAllDocumentsSubscription: Subscription | undefined;
  private createDocumentSubscription: Subscription | undefined;

  constructor(
    private requestErrorHandlerService: RequestErrorHandlerService,
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.getAllDocumentsSubscription = this.documentService
      .getAll()
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.requestErrorHandlerService.handleError(err)
        )
      )
      .subscribe({
        next: (data: Document[]) => {
          this.items = data;
          this.allItems = data;

          this.isLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.getAllDocumentsSubscription?.unsubscribe();

    this.createDocumentSubscription?.unsubscribe();
  }

  changeActiveItem(item: CustomItem): void {
    this.router.navigate(['/documents', item.id]);
  }

  onSearch(value: string): void {
    this.items = this.items.filter((item: CustomItem) =>
      item.text.toLowerCase().includes(value.toLowerCase())
    );
  }

  onClear(): void {
    this.items = this.allItems;
  }

  onClickAdd(): void {
    this.createDocumentSubscription = this.documentService
      .create({
        text: 'Без названия',
        description: '',
        configuration: '{}',
      })
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.requestErrorHandlerService.handleError(err)
        )
      )
      .subscribe({
        next: (document: Document) => {
          this.router.navigate(['/documents', document.id]);
        },
      });
  }
}
