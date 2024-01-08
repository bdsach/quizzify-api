import { turso } from "@lib/turso";

async function addUser(user: User) {
  try {
    const rs = await turso.execute({
      sql: "INSERT INTO users (email, password) VALUES (?, ?)",
      args: [ user.email, user.password ],
    });
    return {
      status: "ok",
      data: rs.rows,
      message: "User created",
    }
  } catch (e) {
    console.error(e);
  }
}

async function checkUserLogin(user: User) {
  try {
    const query = await turso.execute({
      sql: "SELECT * FROM users WHERE email = ?",
      args: [ user.email ],
    });
    const userData = query.rows
  
    if (userData.length === 0) {
      throw new Error("User not found");
    }

    const isMatch = await Bun.password.verify(user.password, String(userData[0].password));
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    return {
      loggedIn: true,
    };
  } catch (error) {
    console.log(error);
    return {
      loggedIn: false,
    };
  }
}

async function getUser(email: string) {
  try {
    const rs = await turso.execute({
      sql: "SELECT email, first_name, last_name, avatar FROM users WHERE email = ?",
      args: [ email ],
    });

    if (rs.rows.length === 0) {
      return {
        status: "error",
        message: "User not found",
      }
    }

    return {
      status: "ok",
      data: rs.rows,
    }
  } catch (e) {
    console.error(e);
  }
}

export { addUser, checkUserLogin, getUser };