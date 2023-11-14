import { SpellSlotData } from "./DataInterfaces";

const slotData: SpellSlotData = {
  level: 0,
  amount: 0,
  max: 0,
};

export let SlotsDefault: SpellSlotData[] = Array.from(
  { length: 9 },
  (_, index) => ({
    ...slotData,
    level: index + 1,
  })
);
