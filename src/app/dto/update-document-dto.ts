import { Document } from '../models/document';

export type UpdateDocumentDto = Omit<Document, 'id'>;
