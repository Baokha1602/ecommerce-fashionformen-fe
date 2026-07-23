// ============================================================
// APP COLORS — FashionForMen Design System
// ============================================================

/** Storefront / Brand Colors (Gold Premium) */
export const AppColors = {
  // --- Storefront (Gold Premium Branding) ---
  Primary: '#c5a880',          // Premium Gold — main brand color
  PrimaryHover: '#d4af37',     // Hover Gold
  PrimaryLight: '#f5efe6',     // Light gold tint (backgrounds)
  PrimaryDark: '#a08060',      // Darker gold (pressed state)

  // --- Neutral ---
  Secondary: '#121212',        // Matte Black (dark bg)
  SecondaryHover: '#1a1a1a',
  White: '#ffffff',
  Black: '#0d0d0d',

  // --- Grays ---
  Gray50: '#fafafa',
  Gray100: '#f5f5f5',
  Gray200: '#e8e8e8',
  Gray400: '#9ca3af',
  Gray500: '#6b7280',
  Gray700: '#374151',
  Gray900: '#111827',

  // --- Admin Portal (Navy Dark) ---
  AdminPrimary: '#002B66',       // Deep Navy Blue
  AdminPrimaryHover: '#003d8f',
  AdminSidebar: '#001529',       // Ant Design dark sider default
  AdminSidebarHover: '#002B66',
  AdminAccent: '#1677ff',        // Ant Design default blue (active states)
} as const;

/** Semantic / Status Colors */
export const SemanticColors = {
  Success: '#52c41a',
  Warning: '#faad14',
  Error: '#ff4d4f',
  Info: '#1677ff',
} as const;

/** Badge / Rank Colors */
export const RankColors = {
  BRONZE: '#cd7f32',
  SILVER: '#a8a9ad',
  GOLD: '#d4af37',
  DIAMOND: '#b9f2ff',
} as const;
