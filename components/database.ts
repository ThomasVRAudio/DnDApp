import * as SQLite from "expo-sqlite";
export const db = SQLite.openDatabase("db.testDb");

class Database {
  CreateTables(): void {
    db.transaction(
      (tx: SQLite.SQLTransaction) => {
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
          create table if not exists Speed
          (id integer primary key not null,
            name text,
            amount integer
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
}

export const database: Database = new Database();
