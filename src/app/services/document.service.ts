// Angular
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// RxJS
import { Observable } from 'rxjs';

// Models
import { Document } from '../models/document';
import { UpdateDocumentDto } from '../models/update-document-dto';

import { API_URL } from '../api';

@Injectable()
export class DocumentService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Document[]> {
    return this.http.get<Document[]>(`${API_URL}/documents`);
  }

  public getById(id: string): Observable<Document | undefined> {
    return this.http.get<Document>(`${API_URL}/documents/${id}`);
  }

  public update(id: string, dto: UpdateDocumentDto): Observable<Document> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.put<Document>(
      `${API_URL}/documents/${id}`,
      dto,
      httpOptions
    );
  }
}
