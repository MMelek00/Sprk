export interface ApiResponseFormat {
  response: Product | {};
  message: string;
}

export interface Product {
  id: string;
  amount_multiplier: number;
  brand: string;
  categ_id: number;
  category_id: string;
  code: string;
  description: string;
  edeka_article_number: string;
  gross_weight: number;
  net_weight: number;
  notes: false;
  packaging: string;
  related_products: string[];
  requires_best_before_date: true;
  best_before_date?: string;
  requires_meat_info: false;
  trade_item_unit_descriptor: string;
  trade_item_unit_descriptor_name: string;
  type: string;
  unit_name: string;
  validation_status: Validation;
  trade_item_descriptor?: string;
}
export enum Validation {
  VALID = "validated",
  INVALID = "invalidated",
}
export enum ServerResponseMessages {
  SUCCESS = "Successful",
  UPDATE_SUCCESS = "Product Successfully updated",
  PRODUCT_UNAVAILABLE = "Product unavailable",
  SERVER_UNREACHABLE = "server unreachable",
}
