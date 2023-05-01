import { Document } from './document';

export type UpdateDocumentDto = Omit<Document, 'id'>;
