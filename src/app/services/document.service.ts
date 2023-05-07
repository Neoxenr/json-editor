// Angular
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// RxJS
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

// Models
import { Document } from '../models/document';

// DTO
import { UpdateDocumentDto } from '../dto/update-document-dto';
import { CreateDocumentDto } from '../dto/create-document-dto';

// Api
import { API_URL } from '../api';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents$: BehaviorSubject<Document[]> = new BehaviorSubject<
    Document[]
  >([]);

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Document[]> {
    if (this.documents$.value.length > 0) {
      return this.documents$.asObservable();
    }

    return this.http.get<Document[]>(`${API_URL}/documents`).pipe(
      switchMap((documents: Document[]) => {
        this.documents$.next(documents);

        return this.documents$;
      })
    );
  }

  public getById(id: string | number): Observable<Document> {
    return this.http.get<Document>(`${API_URL}/documents/${id}`);
  }

  public create(dto: CreateDocumentDto): Observable<Document> {
    return this.http
      .post<Document>(`${API_URL}/documents`, dto, this.httpOptions)
      .pipe(
        tap((createdDocument: Document) => {
          const documents: Document[] = [
            createdDocument,
            ...this.documents$.value,
          ];

          this.documents$.next(documents);

          return createdDocument;
        })
      );
  }

  public update(
    id: string | number,
    dto: UpdateDocumentDto
  ): Observable<Document> {
    return this.http
      .put<Document>(`${API_URL}/documents/${id}`, dto, this.httpOptions)
      .pipe(
        tap((updatedDocument: Document) => {
          const documents: Document[] = [...this.documents$.value];

          const documentIndex: number = documents.findIndex(
            (item: Document) => item.id === id
          );

          documents[documentIndex] = updatedDocument;

          this.documents$.next(documents);

          return updatedDocument;
        })
      );
  }

  public delete(id: string | number): Observable<Object> {
    return this.http.delete(`${API_URL}/documents/${id}`).pipe(
      tap(() => {
        const documents: Document[] = this.documents$.value.filter(
          (document: Document) => document.id !== id
        );

        this.documents$.next(documents);
      })
    );
  }
}
