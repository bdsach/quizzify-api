import { Elysia, t } from "elysia";
import { allQuiz, addQuiz, deleteQuiz } from "@models/Quiz";
import { HTTPStatus } from "../types/HTTPStatus";


const quizRoute = new Elysia();

quizRoute
  .get("/quiz", async () => {
    const quizData = await allQuiz();
    return quizData;
  })
  .post(
    "/quiz",
    async ({ body, set }) => {
      try {
        const title = body.title;
        const add = await addQuiz(title);

        if (add?.status === "ok") {
          set.status = HTTPStatus.CREATED
          return add
        }

        return body;
      } catch (error) {
        console.log(error);
      }
    },
    {
      body: t.Object({
        title: t.String(),
      }),
    }
  )

  .delete("/quiz/:id", async ({ params, set }) => {
    try {
      const id = params.id;
      const deleteData = await deleteQuiz(id);
      if (deleteData?.status === "ok") {
        set.status = HTTPStatus.OK
        return {
          message: "Quiz deleted",
        };
      }
    } catch (error) {
      console.log(error);
    }
  })

export default quizRoute;
