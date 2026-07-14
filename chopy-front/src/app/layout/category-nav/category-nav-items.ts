import {
  LucideApple,
  LucideCookingPot,
  LucideDumbbell,
  LucideEllipsis,
  LucideIconData,
  LucideLamp,
  LucideLaptop,
  LucidePercent,
  LucideShirt,
  LucideSmartphone,
  LucideSofa,
  LucideSparkles,
  LucideSprayCan,
  LucideTablet,
} from '@lucide/angular';

export interface CategoryNavItem {
  label: string;
  icon: LucideIconData;
  slug: string | null;
}

export const CATEGORY_NAV_ITEMS: CategoryNavItem[] = [
  { label: 'Ofertas', icon: LucidePercent.icon, slug: null },
  { label: 'Belleza', icon: LucideSparkles.icon, slug: 'beauty' },
  { label: 'Fragancias', icon: LucideSprayCan.icon, slug: 'fragrances' },
  { label: 'Alimentación', icon: LucideApple.icon, slug: 'groceries' },
  { label: 'Muebles', icon: LucideSofa.icon, slug: 'furniture' },
  { label: 'Decoración', icon: LucideLamp.icon, slug: 'home-decoration' },
  { label: 'Cocina', icon: LucideCookingPot.icon, slug: 'kitchen-accessories' },
  { label: 'Portátiles', icon: LucideLaptop.icon, slug: 'laptops' },
  { label: 'Smartphones', icon: LucideSmartphone.icon, slug: 'smartphones' },
  { label: 'Tablets', icon: LucideTablet.icon, slug: 'tablets' },
  { label: 'Moda', icon: LucideShirt.icon, slug: 'tops' },
  { label: 'Deporte', icon: LucideDumbbell.icon, slug: 'sports-accessories' },
  { label: 'Más productos', icon: LucideEllipsis.icon, slug: null },
];
