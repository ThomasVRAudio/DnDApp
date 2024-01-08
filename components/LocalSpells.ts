import { SpellData } from "./DataInterfaces";

const LocalSpells: SpellData[] = [
  {
    error: "",
    name: "Fey Step",
    desc: [
      `you can magically teleport up to 30 feet to an unoccupied space you can see.
  You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.
  When you reach 3rd level, your Fey Step gains an additional effect based on your season; 
  if the effect requires a saving throw, the DC equals 8 + your proficiency bonus + your Intelligence, Wisdom, or Charisma modifier (choose when you select this race):\n\n 
  Autumn. Immediately after you use your Fey Step, up to two creatures of your choice that you can see within 10 feet of you must succeed on a Wisdom saving throw or be charmed by you for 1 minute,
  or until you or your companions deal any damage to the creatures.
  Winter. When you use your Fey Step, one creature of your choice that you can see within 5 feet of you before you teleport must succeed on a Wisdom saving throw or be frightened of you until the end of your next turn.
  Spring. When you use your Fey Step, you can touch one willing creature within 5 feet of you. 
  That creature then teleports instead of you, appearing in an unoccupied space of your choice that you can see within 30 feet of you.
  Summer. Immediately after you use your Fey Step, each creature of your choice that you can see within 5 feet of you takes fire damage equal to your proficiency bonus.`,
    ],
    level: "Trait",
    components: ["None"],
    range: "30 feet",
    higher_level: [],
    duration: "instantaneous",
    casting_time: "bonus action",
    school: { name: "" },
  },
  {
    error: "",
    name: "Tasha's Hideous Laughter",
    desc: [
      `A creature of your choice that you can see within range perceives everything as hilariously funny and falls into fits of laughter if this spell affects it. 
  The target must succeed on a Wisdom saving throw or fall prone, becoming incapacitated and unable to stand up for the duration. 
  A creature with an Intelligence score of 4 or less isn’t affected. 
  At the end of each of its turns, and each time it takes damage, the target can make another Wisdom saving throw.
  The target has advantage on the saving throw if it’s triggered by damage. On a success, the spell ends.`,
    ],
    level: "1",
    components: ["V", "S", "M"],
    range: "30 feet",
    higher_level: [],
    duration: "Concentration, up to 1 minute",
    casting_time: "1 action",
    school: { name: "Enchantment" },
  },
  {
    error: "",
    name: "Bardic Inspiration",
    desc: [
      `You can inspire others through stirring words or music. 
  To do so, you use a bonus action on your turn to choose one creature other than yourself within 60 feet of you who can hear you. 
  That creature gains one Bardic Inspiration die, a d6.
  Once within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. 
  The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, 
  but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. 
  A creature can have only one Bardic Inspiration die at a time.
  You can use this feature a number of times equal to your Charisma modifier (a minimum of once). You regain any expended uses when you finish a long rest.`,
    ],
    level: "Trait",
    components: ["None"],
    range: "60 feet",
    higher_level: [
      "Your Bardic Inspiration die changes when you reach certain levels in this class. The die becomes a d8 at 5th level, a d10 at 10th level, and a d12 at 15th level.",
    ],
    duration: "Concentration, up to 1 minute",
    casting_time: "bonus action",
    school: { name: "" },
  },
  {
    error: "",
    name: "Song of Rest",
    desc: [
      `Beginning at 2nd level, you can use soothing music or oration to help revitalize your wounded allies during a short rest.
  If you or any friendly creatures who can hear you perform regain hit points by spending Hit Dice at the end of the short rest,
  each of those creatures regainst an extra 1d6 hit points.`,
    ],
    level: "Trait",
    components: ["None"],
    range: "None",
    higher_level: [
      "The extra hit points increase when you reach certain levels in this class: to 1d8 at 9th level, to 1d10 at 13th level, and to 1d12 at 17th level",
    ],
    duration: "1 short rest",
    casting_time: "short rest",
    school: { name: "" },
  },
  {
    error: "",
    name: "Friends",
    desc: [
      `For the duration, you have advantage on all Charisma checks directed at one creature of your choice that isn't hostile toward you. 
      When the spell ends, the creature realizes that you used magic to influence its mood and becomes hostile toward you. 
      A creature prone to violence might attack you. Another creature might seek retribution in other ways (at the DM's discretion), 
      depending on the nature of your interaction with it.`,
    ],
    level: "0",
    components: ["None"],
    range: "0 feet",
    higher_level: [],
    duration: "Concentration, up to 1 minute",
    casting_time: "action",
    school: { name: "" },
  },
];

export default LocalSpells;
