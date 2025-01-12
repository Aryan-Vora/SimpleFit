export interface Photo {
  thumb: string;
  highres?: string | null;
  is_user_uploaded?: boolean;
}

export interface CommonFoodItem {
  tag_id: string;
  tag_name: string;
  serving_qty: number;
  serving_unit: string;
  photo: Photo;
  common_type: null;
  food_name: string;
  locale: string;
}

export interface BrandedFoodItem {
  serving_qty: number;
  region: number;
  nf_calories: number;
  nix_brand_id: string;
  photo: Photo;
  nix_item_id: string;
  food_name: string;
  brand_type: number;
  brand_name_item_name: string;
  serving_unit: string;
  brand_name: string;
  locale: string;
}

export interface Nutrient {
  attr_id: number;
  value: number;
}

export interface FoodMeasure {
  serving_weight: number;
  measure: string;
  seq: number | null;
  qty: number;
}

export interface FoodTags {
  item: string;
  measure: string | null;
  quantity: string;
  food_group: number;
  tag_id: number;
}

export interface DetailedFoodItem {
  food_name: string;
  brand_name: string | null;
  serving_qty: number;
  serving_unit: string;
  serving_weight_grams: number;
  nf_calories: number;
  nf_total_fat: number;
  nf_saturated_fat: number;
  nf_cholesterol: number;
  nf_sodium: number;
  nf_total_carbohydrate: number;
  nf_dietary_fiber: number;
  nf_sugars: number;
  nf_protein: number;
  nf_potassium: number;
  nf_p: number;
  full_nutrients: Nutrient[];
  nix_brand_name: string | null;
  nix_brand_id: string | null;
  nix_item_name: string | null;
  nix_item_id: string | null;
  upc: string | null;
  consumed_at: string;
  metadata: { is_raw_food: boolean };
  source: number;
  ndb_no: number;
  tags: FoodTags;
  alt_measures: FoodMeasure[];
  lat: number | null;
  lng: number | null;
  meal_type: number;
  photo: Photo;
  sub_recipe: null;
  class_code: null;
  brick_code: null;
  tag_id: null;
}

export interface SearchResponse {
  common: CommonFoodItem[];
  branded: BrandedFoodItem[];
}

export interface FoodDetailsResponse {
  foods: DetailedFoodItem[];
}
