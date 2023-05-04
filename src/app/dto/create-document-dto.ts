import { Document } from '../models/document';

export type CreateDocumentDto = Omit<Document, 'id'>;
