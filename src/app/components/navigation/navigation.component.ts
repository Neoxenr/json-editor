// Angular
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
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
  public items: CustomItem[];

  public isLoading: boolean = false;

  public request = new FormControl('', Validators.required);

  private documentsSubscription: Subscription | undefined;

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {
    this.items = [];
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.documentsSubscription = this.documentService.getAll().subscribe({
      next: (data: Document[]) => {
        this.items = data;

        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.documentsSubscription?.unsubscribe();
  }

  activeItemChanged(item: any): void {
    this.router.navigate(['/documents', item.id]);
  }

  search(value: string): void {}
}
