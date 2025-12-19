
export enum FieldType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  LONGTEXT = 'LONGTEXT',
  SELECT = 'SELECT',
  LIST = 'LIST',
  FAQ = 'FAQ',
  RECOMMENDATION = 'RECOMMENDATION',
  IMAGE = 'IMAGE' // 新增圖片類型
}

export interface FieldDefinition {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  required: boolean;
}

export interface Product {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  attributes: Record<string, any>;
}

export interface PromptTemplate {
  id: string;
  category: string;
  title: string;
  description?: string;
  content: string;
}

export interface GoodAsset {
  id: string;
  title: string;
  category: string;
  content: string;
  productIds: string[];
  createdAt: number;
}

export interface CreativeAsset {
  id: string;
  type: 'IMAGE' | 'VIDEO_TITLE' | 'LINK';
  title: string;
  value: string;
  productIds: string[]; 
  createdAt: number;
  tags?: string[];
}

export type AccessLevel = 'EDIT' | 'VIEW' | 'NONE';

export interface UserPermissions {
  dashboard: AccessLevel;
  products: AccessLevel;
  creativeRepo: AccessLevel;
  copyRepo: AccessLevel;
  scriptRepo: AccessLevel;
  oralScript: AccessLevel;
  assets: AccessLevel;
  bvRepo: AccessLevel;
  settings: AccessLevel;
  aiStudio: AccessLevel;
}

export interface User {
  id: string;
  email: string;
  name: string;
  title: string; 
  role: 'ADMIN' | 'MEMBER';
  status: 'APPROVED' | 'PENDING' | 'DISABLED';
  permissions: UserPermissions;
  createdAt: number;
}

export interface VisualSegment {
  time: string;
  visual: string;
  audio: string;
}

export interface AdCampaign {
  id: string;
  productId: string;
  title: string;
  scriptContent: string;
  visualSegments: VisualSegment[];
  platformLinks: { platform: string, url: string }[];
  createdAt: number;
}

export interface AIContent {
  id: string;
  productId: string;
  type: 'COPY' | 'SCRIPT' | 'IMAGE';
  content: string;
  createdAt: number;
}
