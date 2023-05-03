// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  }

  changeActiveItem(item: any): void {
    this.router.navigate(['/documents', item.id]);
  }

  search(value: string): void {
    this.items = this.allItems.filter((item: CustomItem) =>
      item.text.toLowerCase().includes(value.toLowerCase())
    );
  }

  clear(): void {
    this.items = this.allItems;
  }
}
