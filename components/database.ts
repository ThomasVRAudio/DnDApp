import * as SQLite from "expo-sqlite";
export const db = SQLite.openDatabase("db.testDb");

export const createTables = () => {
  db.transaction(
    (tx: SQLite.SQLTransaction) => {
      tx.executeSql(
        "create table if not exists Modifiers (id integer primary key not null, name text, amount integer default 0);"
      );

      tx.executeSql(
        "create table if not exists SavingThrows (id integer primary key not null, name text, active integer );"
      );

      tx.executeSql(
        "create table if not exists Skills (id integer primary key not null, name text, active integer);"
      );
    },
    (error: SQLite.SQLError) => console.log(error),
    () => console.log("success!")
  );
};

export const dropTable = (tableName: string) => {
  db.transaction(
    (tx: SQLite.SQLTransaction) => {
      tx.executeSql(`DROP TABLE IF EXISTS ${tableName};`);
    },
    (error: SQLite.SQLError) => console.log(error),
    () => console.log(`Dropped table: ${tableName}`)
  );
};

export const getData = <T>(tableName: string): Promise<T[] | null> => {
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
};

export const insertIntoTable = (
  table: string,
  columns: string[],
  values: any[]
) => {
  const placeholders = values.map(() => "?").join(", ");

  db.transaction(
    (tx: SQLite.SQLTransaction) => {
      tx.executeSql(
        `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${placeholders})`,
        values
      );
    },
    (error: SQLite.SQLError) => console.log(error),
    () => console.log("Insert: success!")
  );
};

export const updateTable = (
  tableName: string,
  name: string,
  columnName: string,
  newValue: number
) => {
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
};

export const showAllTables = () => {
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
};
