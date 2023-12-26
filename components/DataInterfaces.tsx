export interface EquipmentData {
  error: string;
  name: string;
  equipment_category?: {
    name: string;
  };
  damage?: {
    damage_dice: string;
  };
  armor_class?: {
    base: number;
    dex_bonus: number;
    max_bonus?: number | undefined;
  };
  armor_category?: string;
  weapon_range?: string;
  properties?: {
    name: string;
  }[];
  finesse: number;
  modifier?: string;
  id: number;
}

export interface WeaponData {
  name: string;
  damageDice: string;
  finesse: number;
  modifier?: string;
  weaponRange?: string;
  id: number;
}

export interface ArmorData {
  name: string;
  category: string;
  base: number;
  dexBonus: number;
  maxBonus?: number;
  id: number;
}

export interface SpellSlotData {
  amount: number;
  name: string;
  max: number;
  level: number;
}

export interface SpellData {
  error: string;
  name: string;
  desc: [string];
  higher_level?: string[];
  components?: [string?, string?, string?];
  duration: string;
  level: string;
  range: string;
  casting_time: string;
  school: {
    name: string;
  };
}

export interface SpellDataToMap {
  error: string;
  name: string;
  desc: string;
  higher_level?: string;
  components?: string;
  duration: string;
  level: string;
  range: string;
  casting_time: string;
  school: {
    name: string;
  };
}

export interface ModifierData {
  name: string;
  amount: number;
}

export interface ACInitSpeedData {
  name: string;
  amount: number;
  turnedOn: number;
}

export interface SavingThrowData {
  name: string;
  status: number;
}

export interface SkillData extends SavingThrowData {
  ability: string;
}

export interface CharData {
  Name: string;
  Level: string;
  Race: string;
  Background: string;
  Class: string;
  Alignment: string;
  Experience: string;
}

export interface HealthData {
  name: string;
  amount: number;
}

export interface StatsModData {
  name: string;
  modifier: string;
}

export interface Initial {
  name: string;
  status: number;
}

export interface ItemData {
  name: string;
  desc: string;
  id: number;
}
