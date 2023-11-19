import { CharData } from "./components/DataInterfaces";
import { database } from "./components/Database";

interface Info {
  name: string;
  info: string;
}

export async function GetProficiencyBonusAsync(): Promise<number> {
  try {
    const data: Info[] | null = await database.GetData<Info>(
      "CharacterDetails"
    );
    console.log(data?.forEach((d) => console.log(d)));

    let level = parseInt(data?.find((d) => d.name === "Level")?.info || "0");

    if (level < 1 || level > 20) {
      return 0;
    }

    return Math.ceil((level + 3) / 4);
  } catch (error) {
    console.log(error);
    return 0;
  }
}