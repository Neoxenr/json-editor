// Angular
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// RxJS
import { Observable } from 'rxjs';

// Models
import { Document } from '../models/document';

// DTO
import { UpdateDocumentDto } from '../dto/update-document-dto';
import { CreateDocumentDto } from '../dto/create-document-dto';

// Api
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

  public create(dto: CreateDocumentDto): Observable<Document> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<Document>(`${API_URL}/documents`, dto, httpOptions);
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
