import { Elysia, t } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";

import { addUser, checkUserLogin, getUser } from "@models/User";
import { HTTPStatus } from "src/types/HTTPStatus";
const userRoute = new Elysia();

userRoute
  .use(
    jwt({
      name: "jwt",
      secret: String(process.env.JWT_SECRETS),
    })
  )
  .use(cookie())

  /**
   * Register
   */
  .post(
    "/register",
    async ({ body, set }) => {
      try {
        let userData = body;
        userData.password = await Bun.password.hash(userData.password, {
          algorithm: "bcrypt",
          cost: 4,
        });
        addUser(userData);

        set.status = 201;
        return { message: "User created" };
      } catch (error) {
        console.log(error);
        set.status = 409;
        return { message: "error", error };
      }
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }
  )

  /**
   * Login
   */
  .post(
    "/login",
    async ({ jwt, cookie, setCookie, body,set }) => {
      try {
        let userData = body;
        const response = await checkUserLogin(userData);

        if (!response.loggedIn) {
          set.status = HTTPStatus.UNAUTHORIZED
          return response;
        }

        setCookie(
          "token",
          await jwt.sign({
            email: userData.email,
          }),
          {
            httpOnly: true,
            maxAge: 7 * 86400,
          }
        );
        set.status = HTTPStatus.OK
        return {
          message: "Login successful",
          token: cookie.token,
        };
      } catch (error) {
        console.log(error)
        return {
          status: "error",
          message: error,
        }
      }
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }
  )

  /**
   * Logout
   */
  .get("/logout", async ({ jwt, cookie, setCookie, body, set }) => {
    try {
      setCookie(
        "token","",
        {
          httpOnly: true,
          maxAge: 0,
        }
      );
      set.status = 200
      return {
        message: "Logout successful",
      };
    } catch (error) {
      set.status = 500;
      return { message: "Internal Server Error" };
    }
  })
  /**
   * Profile
   */
  .get("/profile", async ({ jwt, cookie: { token }, set }) => {
    const profile = await jwt.verify(token);
    if (!profile) {
      console.log("Unauthorized");
      set.status = 401;
      return {
        status: "error",
        message: "Unauthorized",
      };
    }

    const userResult = await getUser(String(profile.email));
    if (userResult?.status === "error") {
      set.status = 404
      return userResult
    }
    return userResult
  })

export default userRoute;
