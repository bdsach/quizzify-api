import { Elysia, t } from "elysia";
import { addQuestion } from "@models/Question";

import { HTTPStatus } from "../types/HTTPStatus";
import { addAnswer } from "@models/Answer";


const answerRoute = new Elysia();

answerRoute
  .post(
    "/answer",
    async ({ body, set }) => {
      try {
        const response = await addAnswer(body.question_id, body.answers);

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
        question_id: t.String(),
        answers: t.Array(t.Object({
          text: t.String(),
          is_correct: t.Boolean(),
        }))
      }),
    }
  )


export default answerRoute;
