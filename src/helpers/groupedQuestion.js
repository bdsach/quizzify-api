export const groupedQuestion = (flatResults) => {
  const flattenedData = [];

  flatResults.forEach((row) => {
    let currentQuestion = flattenedData.find(
      (question) => question.id === row.question_id
    );

    if (!currentQuestion) {
      currentQuestion = {
        id: row.question_id,
        quiz_id: row.quiz_id,
        quiz_text: row.quiz_text,
        question_text: row.question_text,
        options: [],
      };
      flattenedData.push(currentQuestion);
    }

    const currentOption = {
      id: row.option_id,
      text: row.option_text,
      option: row.option_char,
      is_correct: row.is_correct,
    };

    currentQuestion.options.push(currentOption);
  });

  return flattenedData;
};
