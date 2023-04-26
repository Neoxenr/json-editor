// Angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// RxJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { Document } from '../models/document';

@Injectable()
export class DocumentService {
  constructor(private http: HttpClient) {}

  public getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>('assets/documents.json');
  }

  public getDocumentById(id: string): Observable<Document | undefined> {
    return this.getDocuments().pipe(
      map((documents: Document[]) =>
        documents.find((document: Document) => document.id === id)
      )
    );
  }
}
