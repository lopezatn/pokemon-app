import { LowSync } from "lowdb";
import { LocalStorage } from "lowdb/browser";

// Aca creamos un adaptador para decirle al browser que obtenemos los datos
// del localstorage, en una variable llamada db
const adapter = new LocalStorage("db");
// Luego agarramos ese adaptador y creamos una base de datos en la memoria
const db = new LowSync(adapter);

// Esta funcion se debe usar antes de traer o cambiar datos en la base,
// Es para cargar lo que se haya guardado en el localStorage
const loadDb = () => {
  db.read();
  db.data ||= {
    user: [
      {
        username: "test1",
        password: "test1",
        email: "random1@gmail.com",
        id: 0,
      },
      {
        username: "random2",
        password: "random456",
        email: "random2@gmail.com",
        id: 1,
      },
      {
        username: "random3",
        password: "random789",
        email: "random3@gmail.com",
        id: 2,
      },
    ],
  };
};

//Crear un metodo para updatear una password a un usuario

export const getUsers = () => {
  loadDb();
  return db.data.user;
};

export const updateUserPassword = (username, newPassword) => {
  loadDb();
  const users = getUsers();
  const user = users.filter((user) => user.username === username);
  if (user) {
    user.password = newPassword;
    db.write();
    return true;
  }

  return false;
};

export const createUser = (username, password, email) => {
  loadDb();
  db.data.user.push({
    username,
    password,
    email,
    id: db.data.user.length,
  });
  db.write();
};

export const getUserByEmail = (email) => {
  const users = getUsers();
  const user = users.filter((user) => user.email === email);
  return user[0];
};

export const getUserByUsername = (username) => {
  const users = getUsers();
  const user = users.filter((user) => user.username === username);
  return user[0];
};
