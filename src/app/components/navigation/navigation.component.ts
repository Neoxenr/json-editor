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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit, OnDestroy {
  public requiredInputControl = new FormControl('', Validators.required);

  public items: CustomItem[];

  private documentsSubscription: Subscription | undefined;

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {
    this.items = [];
  }

  ngOnInit(): void {
    this.documentsSubscription = this.documentService.getAll().subscribe({
      next: (data: Document[]) => {
        this.items = data;
      },
    });
  }

  ngOnDestroy(): void {
    this.documentsSubscription?.unsubscribe();
  }

  public activeItemChanged(item: any): void {
    this.router.navigate(['/documents', item.id]);
  }

  public search(value: string): void {}
}
