import { useTranslations } from 'next-intl';
import { IStatusObj } from '@/constants/object';

export const useObjectLabels = () => {
  // We'll need to get the appropriate translation namespace
  // For now, we'll create a generic function that accepts a t function
  
  const getLocalizedLabel = (obj: IStatusObj, t: ReturnType<typeof useTranslations>): string => {
    return t(obj.labelKey);
  };

  const getLocalizedLabels = (objects: IStatusObj[], t: ReturnType<typeof useTranslations>): Array<IStatusObj & { localizedLabel: string }> => {
    return objects.map(obj => ({
      ...obj,
      localizedLabel: t(obj.labelKey)
    }));
  };

  const findLocalizedLabel = (objects: IStatusObj[], value: string, t: ReturnType<typeof useTranslations>): string => {
    const found = objects.find(obj => obj.value === value);
    return found ? t(found.labelKey) : value;
  };

  return {
    getLocalizedLabel,
    getLocalizedLabels,
    findLocalizedLabel
  };
};

// Specific hooks for different object types
export const useStatusLabels = () => {
  const t = useTranslations();
  const { getLocalizedLabel, getLocalizedLabels, findLocalizedLabel } = useObjectLabels();

  return {
    getLocalizedLabel: (obj: IStatusObj) => getLocalizedLabel(obj, t),
    getLocalizedLabels: (objects: IStatusObj[]) => getLocalizedLabels(objects, t),
    findLocalizedLabel: (objects: IStatusObj[], value: string) => findLocalizedLabel(objects, value, t)
  };
}; 