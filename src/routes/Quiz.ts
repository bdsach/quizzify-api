import { Elysia, t } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";
import {
  allQuiz,
  quizById,
  addQuiz,
  deleteQuiz,
  allCategories,
} from "@models/Quiz";
import { HTTPStatus } from "../types/HTTPStatus";

const quizRoute = new Elysia();

quizRoute
  .use(
    jwt({
      name: "jwt",
      secret: String(process.env.JWT_SECRETS),
    })
  )
  .use(cookie())

  /**
   * All Quizzes
   */
  .get("/quiz", async ({ jwt, cookie }) => {
    try {
      const profile = await jwt.verify(cookie.token);

      if (!profile) {
        return {
          status: "error",
          message: "Unauthorized",
        };
      }

      const quizData = await allQuiz();
      return quizData;
    } catch (error) {
      console.log(error);
    }
  })

  /**
   * Quiz by id
   */
  .get(
    "quiz/:id",
    async ({ jwt, cookie, params }) => {
      try {
        const profile = await jwt.verify(cookie.token);

        if (!profile) {
          return {
            status: "error",
            message: "Unauthorized",
          };
        }

        const id = params.id;
        const quizData = await quizById(id);
        return quizData;
      } catch (error) {
        console.log(error);
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )

  /**
   * All Quiz Categories
   */
  .get("/quiz/categories", async ({ jwt, cookie, params }) => {
    try {
      const profile = await jwt.verify(cookie.token);

      if (!profile) {
        return {
          status: "error",
          message: "Unauthorized",
        };
      }

      const quizData = await allCategories();
      return quizData;
    } catch (error) {
      console.log(error);
    }
  })
  .post(
    "/quiz",
    async ({ body, set, jwt, cookie }) => {
      try {
        const profile = await jwt.verify(cookie.token);

        if (!profile) {
          return {
            status: "error",
            message: "Unauthorized",
          };
        }

        const response = await addQuiz(body.text, body.slug);

        if (response?.status === "ok") {
          set.status = HTTPStatus.CREATED;
          return response;
        }

        return response;
      } catch (error) {
        console.log(error);
      }
    },
    {
      body: t.Object({
        text: t.String(),
        slug: t.String(),
      }),
    }
  )

  .delete("/quiz/:id", async ({ params, set, jwt, cookie }) => {
    try {
      const profile = await jwt.verify(cookie.token);

      if (!profile) {
        return {
          status: "error",
          message: "Unauthorized",
        };
      }

      const id = params.id;
      const deleteData = await deleteQuiz(id);
      if (deleteData?.status === "ok") {
        set.status = HTTPStatus.OK;
        return {
          message: "Quiz deleted",
        };
      }
    } catch (error) {
      console.log(error);
    }
  });

export default quizRoute;
