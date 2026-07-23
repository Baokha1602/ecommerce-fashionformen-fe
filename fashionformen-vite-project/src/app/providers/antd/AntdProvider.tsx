import React from 'react';
import { App, ConfigProvider, theme as antdTheme } from 'antd';

import viVN from 'antd/locale/vi_VN';
import EmptyCustom from '@/shared/components/empty/EmptyCustom';
import { AppColors } from '@/shared/theme/colors';
import { AppFontFamily } from '@/shared/theme/fonts';
import { useTheme } from '@/app/providers/theme/hooks/useTheme';

type AntdProviderProps = {
  children: React.ReactNode;
};

/* https://ant.design/components/config-provider */
const AntdProvider: React.FC<AntdProviderProps> = ({ children }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <ConfigProvider
      // Cấu hình ngôn ngữ toàn bộ Ant Design (DatePicker, Pagination,...)
      locale={viVN}
      // Custom component hiển thị khi không có dữ liệu (Table, Select,...)
      renderEmpty={() => <EmptyCustom />}
      // Cấu hình theme toàn cục
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          // ── Brand & Color ─────────────────────────────────────────
          colorPrimary: AppColors.Primary,
          colorSuccess: '#52c41a',
          colorWarning: '#faad14',
          colorError: '#ff4d4f',
          colorInfo: AppColors.Primary,

          // ── Typography ────────────────────────────────────────────
          fontFamily: AppFontFamily.Primary,
          fontSize: 14,
          fontSizeLG: 16,
          fontSizeXL: 20,

          // ── Shape / Border ────────────────────────────────────────
          borderRadius: 8,
          borderRadiusLG: 12,
          borderRadiusSM: 6,

          // ── Spacing ───────────────────────────────────────────────
          padding: 16,
          paddingLG: 24,
          paddingSM: 12,
          paddingXS: 8,

          // ── Motion ────────────────────────────────────────────────
          motionDurationMid: '0.2s',
          motionDurationSlow: '0.3s',
        },

        // Customize riêng từng component
        components: {
          Layout: {
            headerBg: isDark ? AppColors.Secondary : '#fff',
            siderBg: isDark ? AppColors.AdminSidebar : '#fff',
            bodyBg: isDark ? '#0f0f0f' : AppColors.Gray100,
            headerHeight: 64,
          },

          Menu: {
            itemSelectedBg: `${AppColors.Primary}20`,
            itemSelectedColor: AppColors.Primary,
            itemHoverBg: `${AppColors.Primary}10`,
            darkItemSelectedBg: AppColors.Primary,
            darkItemSelectedColor: '#fff',
            darkItemHoverBg: 'rgba(255,255,255,0.08)',
            itemBorderRadius: 8,
            subMenuItemBorderRadius: 6,
          },

          Button: {
            borderRadius: 8,
            borderRadiusLG: 10,
            controlHeight: 40,
            controlHeightLG: 48,
            controlHeightSM: 32,
            fontWeight: 600,
            primaryShadow: `0 4px 12px ${AppColors.Primary}40`,
          },

          Input: {
            controlHeight: 40,
            controlHeightLG: 48,
            borderRadius: 8,
            borderRadiusLG: 10,
            paddingInline: 12,
          },

          Select: {
            controlHeight: 40,
            borderRadius: 8,
          },

          Card: {
            borderRadius: 12,
            borderRadiusLG: 16,
            paddingLG: 20,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          },

          Table: {
            borderRadius: 12,
            headerBg: isDark ? '#1a1a1a' : '#fafafa',
          },

          Modal: {
            borderRadius: 16,
          },

          Drawer: {
            borderRadius: 0,
          },

          Tag: {
            borderRadius: 6,
            fontSizeSM: 11,
          },

          Badge: {
            borderRadius: 8,
          },

          Switch: {
            colorPrimary: AppColors.Primary,
            colorPrimaryHover: AppColors.PrimaryHover,
            handleBg: '#fff',
          },

          Tabs: {
            itemSelectedColor: AppColors.Primary,
            inkBarColor: AppColors.Primary,
          },

          Progress: {
            defaultColor: AppColors.Primary,
          },
        },
      }}
    >
      <App
        // Config notification global — tránh spam quá nhiều thông báo cùng lúc
        notification={{ maxCount: 2 }}
      >
        {children}
      </App>
    </ConfigProvider>
  );
};

export default AntdProvider;
