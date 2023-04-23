// Angular
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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
export class NavigationComponent implements OnInit {
  public requiredInputControl = new FormControl('', Validators.required);

  // ?
  public documents: Document[];

  public items: PrizmNavigationMenuItem[] = [];

  constructor(private documentService: DocumentService) {
    this.documents = [];

    this.items = [];
  }

  ngOnInit(): void {
    this.documentService.getDocuments().subscribe({
      next: (data: Document[]) => {
        this.documents = data;

        this.items = data.map((document: Document) => ({
          text: document.name,
        }));
      },
    });
  }

  public search(value: string): void {}
}
