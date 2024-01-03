import { Elysia, t } from "elysia";
import { addQuestion } from "@models/Question";

import { HTTPStatus } from "../types/HTTPStatus";


const questionRoute = new Elysia();

questionRoute
  .post(
    "/question",
    async ({ body, set }) => {
      try {
        const response = await addQuestion(body.quiz_id, body.text, body.answers);

        if (response?.status === "error") {
          set.status = HTTPStatus.INTERNAL_SERVER_ERROR
          return response
        }
        set.status = HTTPStatus.CREATED
        return response;
        
      } catch (error) {
        console.log(error);
      }
    },
    {
      body: t.Object({
        text: t.String(),
        quiz_id: t.String(),
        answers: t.Array(t.Object({
          text: t.String(),
          is_correct: t.Boolean(),
          option: t.String(),
        }))
      }),
    }
  )


export default questionRoute;
