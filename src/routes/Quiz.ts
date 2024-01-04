import { Elysia, t } from "elysia";
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
  .get("/quiz", async () => {
    const quizData = await allQuiz();
    return quizData;
  })
  .get(
    "quiz/:id",
    async ({ params }) => {
      const id = params.id;
      const quizData = await quizById(id);
      return quizData;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )

  .get("/quiz/categories", async () => {
    const quizData = await allCategories();
    return quizData;
  })
  .post(
    "/quiz",
    async ({ body, set }) => {
      try {
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

  .delete("/quiz/:id", async ({ params, set }) => {
    try {
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
