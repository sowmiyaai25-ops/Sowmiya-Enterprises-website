export interface ProductItem {
  id: string;
  name: string;
  category: 'chocolates' | 'coffee' | 'beverages' | 'dairy' | 'vending';
  categoryLabel: string;
  description: string;
  packInfo: string;
  packWeight?: '1 KG Packet' | 'Carton Case' | 'Hardware Unit';
  shelfLife: string;
  image: string;
  is3dSpecial?: boolean;
  featuredTag?: string;
  targetSegment: 'B2B & B2C' | 'B2B Institutions' | 'Commercial Outlets';
  specs: {
    origin: string;
    packaging: string;
    idealFor: string;
    minimumOrder: string;
  };
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
  inquiryType?: 'B2B Institutional' | 'Direct Commercial';
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: 'hills' | 'office' | 'pour' | 'relax';
  beverageName: string;
  servingVibe: string;
  canvasTheme: 'cool_hills' | 'office_team' | 'crema_pour' | 'morning_sip';
}

export interface GodownHotspot {
  id: string;
  title: string;
  xPercent: number;
  yPercent: number;
  description: string;
  spec: string;
}
