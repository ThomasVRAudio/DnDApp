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
  properties?: {
    name: string;
  }[];
  finesse: number;
}

export interface WeaponData {
  name: string;
  damageDice: string;
  finesse: number;
}

export interface ArmorData {
  name: string;
  category: string;
  base: number;
  dexBonus: number;
  maxBonus?: number;
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

export interface SpeedData {
  name: string;
  amount: number;
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
