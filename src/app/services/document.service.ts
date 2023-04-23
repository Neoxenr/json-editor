// Angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Models
import { Document } from '../models/document';

@Injectable()
export class DocumentService {
  constructor(private http: HttpClient) {}

  public getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>('assets/documents.json');
  }
}
