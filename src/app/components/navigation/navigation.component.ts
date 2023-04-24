// Angular
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

// RxJS
import { Subscription } from 'rxjs';

// Prizm UI
import { PrizmNavigationMenuItem } from '@prizm-ui/components';

// Models
import { Document } from '../../models/document';

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

  // ?
  public documents: Document[];

  public items: PrizmNavigationMenuItem[];

  private documentsSubscription: Subscription | undefined;

  constructor(private documentService: DocumentService) {
    this.documents = [];

    this.items = [];
  }

  test(t: any): void {
    console.log('t :>> ', t);
  }

  ngOnInit(): void {
    this.documentsSubscription = this.documentService.getDocuments().subscribe({
      next: (data: Document[]) => {
        this.documents = data;

        this.items = data.map((document: Document) => ({
          text: document.name,
        }));
      },
    });
  }

  ngOnDestroy(): void {
    this.documentsSubscription?.unsubscribe();
  }

  public search(value: string): void {}
}
