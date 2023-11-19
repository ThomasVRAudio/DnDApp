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
    base: string;
  };
  armor_category?: string;
}

export interface SpellSlotData {
  amount: number;
  level: number;
  max: number;
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

export interface ModifierData {
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
