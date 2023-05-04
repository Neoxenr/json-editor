// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// RxJS
import { Subscription } from 'rxjs';

// Models
import { Document } from '../../models/document';
import { CustomItem } from '../../models/custom-item';

// Services
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less'],
  providers: [DocumentService],
})
export class NavigationComponent implements OnInit, OnDestroy {
  public items: CustomItem[] = [];
  public allItems: CustomItem[] = [];

  public isLoading: boolean = false;

  private documentsSubscription: Subscription | undefined;
  private createDocumentSubscription: Subscription | undefined;

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.documentsSubscription = this.documentService.getAll().subscribe({
      next: (data: Document[]) => {
        this.items = data;
        this.allItems = data;

        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.documentsSubscription?.unsubscribe();

    this.createDocumentSubscription?.unsubscribe();
  }

  changeActiveItem(item: CustomItem): void {
    this.router.navigate(['/documents', item.id]);
  }

  onSearch(value: string): void {
    this.items = this.allItems.filter((item: CustomItem) =>
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
      .subscribe({
        next: (document: Document) => {
          this.allItems = [document, ...this.allItems];

          this.items = this.allItems;

          this.router.navigate(['/documents', document.id]);
        },
      });
  }
}
