
import { FieldType, FieldDefinition, UserPermissions } from './types';

export const DEFAULT_FIELDS: FieldDefinition[] = [
  { id: 'f_sku', name: 'sku', label: '貨號', type: FieldType.TEXT, required: true },
  { id: 'f_watsons_sku', name: 'watsons_sku', label: '屈臣氏貨號', type: FieldType.TEXT, required: false },
  { id: 'f_prod_img', name: 'product_image', label: '單品圖片', type: FieldType.IMAGE, required: false }, // 新增
  { id: 'f_web_img', name: 'web_image', label: '網頁圖片', type: FieldType.IMAGE, required: false }, // 新增
  { id: 'f_usage', name: 'usage_instructions', label: '使用方式教學', type: FieldType.LONGTEXT, required: false },
  { id: 'f_ingredients', name: 'ingredients', label: '全成分資料', type: FieldType.LONGTEXT, required: false },
  { id: 'f_usp', name: 'usp', label: '產品特點', type: FieldType.LIST, required: false },
  { id: 'f_pain_points', name: 'pain_points', label: '產品痛點 (消費者為何要買)', type: FieldType.LIST, required: false },
  { id: 'f_recommend', name: 'related_products', label: '推薦搭配產品 (品名/連結/原因)', type: FieldType.RECOMMENDATION, required: false },
  { id: 'f_target_audiences', name: 'target_audiences', label: '目標受眾', type: FieldType.LIST, required: false },
  { id: 'f_faq', name: 'faq', label: '常見問答 (FAQ)', type: FieldType.FAQ, required: false },
  { id: 'f_value_prop', name: 'value_prop', label: 'CP值/性價比說法', type: FieldType.LIST, required: false },
  { id: 'f_testimonials', name: 'testimonials', label: '口碑/客戶證言', type: FieldType.LIST, required: false },
  { id: 'f_official_url', name: 'official_url', label: '官網短網址', type: FieldType.TEXT, required: false },
  { id: 'f_shopee_url', name: 'shopee_url', label: '蝦皮短網址', type: FieldType.TEXT, required: false },
  { id: 'f_watsons_url', name: 'watsons_url', label: '屈臣氏短網址', type: FieldType.TEXT, required: false },
];

export const DEFAULT_CATEGORIES = ['美妝保養', '保健食品', '生活用品', '3C家電', '婦幼用品'];

export const DEFAULT_JOB_TITLES = ['資深企劃', '文案指導', '社群編輯', '視覺設計', '廣告投放'];

export const DEFAULT_MEMBER_PERMISSIONS: UserPermissions = {
  dashboard: 'VIEW',
  products: 'VIEW',
  creativeRepo: 'VIEW',
  copyRepo: 'VIEW',
  scriptRepo: 'VIEW',
  oralScript: 'NONE',
  assets: 'NONE',
  bvRepo: 'NONE',
  settings: 'NONE',
  aiStudio: 'NONE',
};

export const ADMIN_PERMISSIONS: UserPermissions = {
  dashboard: 'EDIT',
  products: 'EDIT',
  creativeRepo: 'EDIT',
  copyRepo: 'EDIT',
  scriptRepo: 'EDIT',
  oralScript: 'EDIT',
  assets: 'EDIT',
  bvRepo: 'EDIT',
  settings: 'EDIT',
  aiStudio: 'EDIT',
};

export const STORAGE_KEYS = {
  PRODUCTS: 'pd_mgt_products',
  FIELDS: 'pd_mgt_fields',
  AI_HISTORY: 'pd_mgt_ai_history',
  PROMPT_TEMPLATES: 'pd_mgt_prompts',
  BV_PROMPTS: 'pd_mgt_bv_prompts',
  CATEGORIES: 'pd_mgt_categories',
  GOOD_COPY: 'pd_mgt_good_copy',
  GOOD_SCRIPTS: 'pd_mgt_good_scripts',
  CREATIVE_REPO: 'pd_mgt_creative_repo',
  AD_CAMPAIGNS: 'pd_mgt_ad_campaigns',
  USERS: 'pd_mgt_users',
  CURRENT_USER: 'pd_mgt_current_user',
  JOB_TITLES: 'pd_mgt_job_titles'
};
