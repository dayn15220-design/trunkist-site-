export type TabType =
  | 'features-overview'
  | 'parry-arena'
  | 'weapon-dps'
  | 'executor-console';

export type LanguageType = 'ru' | 'en';

export interface TrunkistFeature {
  nameRu: string;
  nameEn: string;
  descRu: string;
  descEn: string;
  tab: 'Main' | 'Aim' | 'Physics' | 'Visuals' | 'Sound' | 'Settings';
  defaultState: boolean | string | number;
}
