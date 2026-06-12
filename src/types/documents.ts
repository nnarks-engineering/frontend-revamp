/**
 * Document types — mirrors expected backend DocumentRead schemas.
 * Ready for backend integration when the API is available.
 */
import type { DocumentFileType } from "./enums";

/** The category a document belongs to — drives the sidebar filter. */
export type DocumentCategory =
  | "ALL"
  | "CONTRACT"
  | "PAY_SLIP"
  | "EMPLOYMENT_LETTER"
  | "REPORT"
  | "INVOICE"
  | "OTHER";

/** A single document record from the API. */
export interface DocumentItem {
  id: string;
  project_id?: string;
  name: string;
  file_type: DocumentFileType;
  category: DocumentCategory;
  size_bytes: number;
  url: string;
  uploaded_by?: string;
  uploaded_at: string;
}

/** Payload for uploading a new document. */
export interface DocumentUploadPayload {
  project_id?: string;
  name: string;
  file_type: DocumentFileType;
  category: DocumentCategory;
  file: File;
}

export interface CategoryFilterItem {
  id: DocumentCategory;
  label: string;
  icon: React.ElementType;
}
