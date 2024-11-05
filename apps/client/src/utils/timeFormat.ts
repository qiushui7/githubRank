import { format, formatDistanceToNow } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';
import { useI18n } from 'vue-i18n';

const locales = {
  zh: zhCN,
  en: enUS,
} as const;

export const formatDate = (date: string | Date) => {
  return format(new Date(date), 'yyyy-MM-dd');
};

export const formatDistance = (time: string) => {
  const { locale } = useI18n();
  return formatDistanceToNow(new Date(time), {
    addSuffix: true,
    locale: locales[locale.value as 'zh' | 'en'] || enUS,
  });
};
