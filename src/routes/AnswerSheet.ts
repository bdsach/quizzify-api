import { Elysia, t } from "elysia";
import { HTTPStatus } from "../types/HTTPStatus";
import { add } from "@models/AnswerSheet/add";

const answerSheetRoute = new Elysia();

answerSheetRoute.post(
  "/answersheet",
  async ({ body, set }) => {
    try {
      const response = await add(
        body.question_id,
        body.answer_id,
        Number(body.user_id)
      );

      if (response?.status === "error") {
        set.status = HTTPStatus.CONFLICT
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
      answer_id: t.String(),
      user_id: t.String(),
    }),
  }
);

export default answerSheetRoute;
