import * as SQLite from "expo-sqlite";
import { Initial } from "./DataInterfaces";
export const db = SQLite.openDatabase("db.testDb");

class Database {
  CreateTables(): void {
    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          "create table if not exists Initial (id integer primary key not null, name text, status integer default 0);"
        );

        tx.executeSql(
          "create table if not exists Modifiers (id integer primary key not null, name text, amount integer default 0);"
        );

        tx.executeSql(
          "create table if not exists Skills (id integer primary key not null, name text, status integer, ability text);"
        );

        tx.executeSql(
          "create table if not exists SavingThrows (id integer primary key not null, name text, status integer);"
        );

        tx.executeSql(
          "create table if not exists CharacterDetails (id integer primary key not null, name text, info text);"
        );

        tx.executeSql(
          "create table if not exists Health (id integer primary key not null, name text, amount integer);"
        );

        tx.executeSql(
          `
          create table if not exists Spells 
          (id integer primary key not null, 
            name text, 
            desc text, 
            higher_level text, 
            components text,
            duration text,
            level text,
            range text,
            casting_time text,
            school text            
            );
          `
        );

        tx.executeSql(
          `
          create table if not exists SpellSlots 
          (id integer primary key not null, 
            name text, 
            amount integer, 
            max integer, 
            level integer);
          `
        );

        tx.executeSql(
          `
          create table if not exists Counters 
          (id integer primary key not null, 
            name text, 
            amount integer, 
            max integer);
          `
        );

        tx.executeSql(
          `
          create table if not exists Weaponset
          (id integer primary key not null,
            name text,
            damageDice text,
            finesse integer,
            weaponRange text,
            modifier text,
            weaponID integer
            )
          `
        );

        tx.executeSql(
          `
          create table if not exists Armorset
          (id integer primary key not null,
            name text,
            category text,
            base integer,
            dexBonus integer,
            maxBonus integer
            )
          `
        );

        tx.executeSql(
          `
          create table if not exists ACInitSpeed
          (id integer primary key not null,
            name text,
            amount integer,
            turnedOn integer
            )
          `
        );

        tx.executeSql(
          `
          create table if not exists Items
          (id integer primary key not null,
            name text,
            desc text
            )
          `
        );

        tx.executeSql(
          `
          create table if not exists Coins
          (id integer primary key not null,
            name text,
            amount integer
            )
          `
        );

        tx.executeSql(
          `
          create table if not exists Stats
          (id integer primary key not null,
            name text,
            modifier text
            )
          `
        );
      },
      (error: SQLite.SQLError) => console.log(error),
      () => console.log("success!")
    );
  }

  DropTable(tableName: string): void {
    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(`DROP TABLE IF EXISTS ${tableName};`);
      },
      (error: SQLite.SQLError) => console.log(error),
      () => console.log(`Dropped table: ${tableName}`)
    );
  }

  GetData<T>(tableName: string): Promise<T[] | null> {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx: SQLite.SQLTransaction) => {
          tx.executeSql(
            `SELECT * FROM ${tableName}`,
            [],
            (_: SQLite.SQLTransaction, resultSet: SQLite.SQLResultSet) => {
              const rows = resultSet.rows;
              const data: T[] = [];
              for (let i = 0; i < rows.length; i++) {
                data.push(rows.item(i));
              }
              resolve(data);
            }
          );
        },
        (error: SQLite.SQLError) => {
          console.log(error);
          reject(error);
        },
        () => console.log("Get Data: success!")
      );
    });
  }

  UpdateTable(
    tableName: string,
    name: string,
    columnName: string,
    newValue: string | number
  ): void {
    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          `UPDATE ${tableName} SET ${columnName} = ? WHERE name = ?`,
          [newValue, name]
        );
      },
      (error: SQLite.SQLError) => console.log(error),
      () => console.log(`Updated amount for ${name}: success!`)
    );
  }

  UpdateTableByID(
    tableName: string,
    id: number,
    columnName: string,
    newValue: string | number
  ): void {
    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          `UPDATE ${tableName} SET ${columnName} = ? WHERE ID = ?`,
          [newValue, id]
        );
      },
      (error: SQLite.SQLError) => console.log(error),
      () => console.log(`Updated amount for ${id}: success!`)
    );
  }

  RemoveRow = async (tableName: string, name: string): Promise<void> => {
    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          `DELETE FROM ${tableName} WHERE ROWID IN (SELECT ROWID FROM ${tableName} WHERE name = ? LIMIT 1)`,
          [name]
        );
      },
      (error: SQLite.SQLError) => console.error("Transaction error:", error)
    );
  };

  RemoveRowByID = async (tableName: string, id: number): Promise<void> => {
    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          `DELETE FROM ${tableName} WHERE ROWID IN (SELECT ROWID FROM ${tableName} WHERE id = ? LIMIT 1)`,
          [id]
        );
      },
      (error: SQLite.SQLError) => console.error("Transaction error:", error)
    );
  };

  InsertIntoTable(table: string, columns: string[], values: any[]) {
    const placeholders = values.map(() => "?").join(", ");

    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          `INSERT OR REPLACE INTO ${table} (${columns.join(
            ", "
          )}) VALUES (${placeholders})`,
          values
        );
      },
      (error: SQLite.SQLError) => console.log(error),
      () => console.log("Insert: success!")
    );
  }

  ShowAllTables() {
    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';",
          [],
          (_, result) => {
            const tables: string[] = [];
            for (let i = 0; i < result.rows.length; i++) {
              tables.push(result.rows.item(i).name);
            }
            console.log("Tables:", tables);
          }
        );
      },
      (error: SQLite.SQLError) => console.log(error),
      () => console.log("Show All Tables: success!")
    );
  }

  ShowTableContent(tableName: string) {
    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(`PRAGMA table_info(${tableName});`, [], (_, result) => {
          const tables: string[] = [];
          for (let i = 0; i < result.rows.length; i++) {
            tables.push(result.rows.item(i).name);
          }
          console.log("Tables:", tables);
        });
      },
      (error: SQLite.SQLError) => console.log(error),
      () => console.log("Show All Tables: success!")
    );
  }

  TestDataBase(): void {
    const tableName = "Armorset";

    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(`SELECT * FROM ${tableName};`, [], (_, result) => {
          const rows = result.rows;
          console.log(`Table: ${tableName}`);
          for (let i = 0; i < rows.length; i++) {
            console.log(rows.item(i));
          }
        });
      },
      (error: SQLite.SQLError) => console.log(error),
      () => console.log("TestDataBase: success!")
    );
  }

  RemoveAllRows(tableName: string): void {
    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(`DELETE FROM ${tableName};`, [], (_, deleteResult) => {
          console.log(
            `Removed all rows from ${tableName}. Rows affected: ${deleteResult.rowsAffected}`
          );
        });
      },
      (error: SQLite.SQLError) => console.log(error),
      () => console.log(`RemoveAllRows for ${tableName}: success!`)
    );
  }

  InitializeDatabase = async (): Promise<boolean> => {
    // this.DropTable("ACInitSpeed");
    // this.DropTable("Health");
    // this.DropTable("SpellSlots");
    // this.DropTable("Modifiers");
    // this.DropTable("Stats");
    // this.DropTable("CharacterDetails");
    // this.DropTable("SavingThrows");
    // this.DropTable("Skills");
    // this.DropTable("Initial");
    // this.DropTable("Spells");
    // this.DropTable("Armorset");
    // this.DropTable("Weaponset");
    // this.DropTable("Counters");
    // this.DropTable("Items");
    // this.DropTable("Coins");
    // this.ShowAllTables();
    // return false;

    try {
      this.CreateTables();
      const data = await this.GetData<Initial | null>("Initial");

      let alreadyExists = data?.find((d) => d?.name === "Initial")?.status;

      if (alreadyExists !== undefined || alreadyExists === 1) return true;

      this.InsertIntoTable(
        "ACInitSpeed",
        ["name", "amount", "turnedOn"],
        ["speed", 25, 1]
      );
      this.InsertIntoTable(
        "ACInitSpeed",
        ["name", "amount", "turnedOn"],
        ["ac", 0, 0]
      );

      let columns = ["name", "amount"];
      let valueNames = ["maxHealth", "currentHealth", "tempHealth"];
      valueNames.forEach((val) =>
        this.InsertIntoTable("Health", columns, [val, 0])
      );

      for (let i = 0; i < 9; i++) {
        database.InsertIntoTable(
          "SpellSlots",
          ["name", "amount", "max", "level"],
          [`Level ${i + 1} `, 0, 0, i + 1]
        );
      }

      valueNames = [
        "Strength",
        "Dexterity",
        "Constitution",
        "Intelligence",
        "Wisdom",
        "Charisma",
      ];

      columns = ["name", "amount"];
      valueNames.forEach((val) =>
        this.InsertIntoTable("Modifiers", columns, [val, 10])
      );

      this.InsertIntoTable(
        "Stats",
        ["name", "modifier"],
        ["Spell Attack", "Charisma"]
      );
      this.InsertIntoTable(
        "Stats",
        ["name", "modifier"],
        ["Spell Save DC", "Charisma"]
      );

      let characterValues = [
        ["Name", "Unknown"],
        ["Level", "1"],
        ["Race", "Human"],
        ["Background", "Adventurer"],
        ["Alignment", "Neutral"],
        ["Class", "Fighter"],
        ["Experience", "0"],
      ];

      columns = ["name", "info"];
      characterValues.forEach((val) =>
        this.InsertIntoTable("CharacterDetails", columns, val)
      );

      valueNames = [
        "Strength",
        "Dexterity",
        "Constitution",
        "Intelligence",
        "Wisdom",
        "Charisma",
      ];

      columns = ["name", "status"];
      valueNames.forEach((val) =>
        this.InsertIntoTable("SavingThrows", columns, [val, 0])
      );

      let values = [
        ["Acrobatics (DEX)", 0, "Dexterity"],
        ["Animal Handling (WIS)", 0, "Wisdom"],
        ["Arcana (INT)", 0, "Intelligence"],
        ["Athletics (STR)", 0, "Strength"],
        ["Deception (CHA)", 0, "Charisma"],
        ["History (INT)", 0, "Intelligence"],
        ["Insight (WIS)", 0, "Wisdom"],
        ["Intimidation (CHA)", 0, "Charisma"],
        ["Investigation (INT)", 0, "Intelligence"],
        ["Medicine (WIS)", 0, "Wisdom"],
        ["Nature (INT)", 0, "Intelligence"],
        ["Perception (WIS)", 0, "Wisdom"],
        ["Performance (CHA)", 0, "Charisma"],
        ["Persuasion (CHA)", 0, "Charisma"],
        ["Religion (INT)", 0, "Intelligence"],
        ["Sleight of Hand (DEX)", 0, "Dexterity"],
        ["Stealth (DEX)", 0, "Dexterity"],
        ["Survival (WIS)", 0, "Wisdom"],
      ];

      columns = ["name", "status", "ability"];
      values.forEach((val) => this.InsertIntoTable("Skills", columns, val));

      let coinValues = [
        ["Copper (cp)", 0],
        ["Silver (sp)", 0],
        ["Electrum (ep)", 0],
        ["Gold (gp)", 0],
        ["Platinum (pp)", 0],
      ];

      columns = ["name", "amount"];
      coinValues.forEach((val) => this.InsertIntoTable("Coins", columns, val));

      this.InsertIntoTable("Initial", ["name", "status"], ["Initial", 1]);
    } catch (error) {
      console.error("Error:", error);
    }

    return true;
  };
}

export const database: Database = new Database();
