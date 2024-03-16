  let formatted = {};
  formatted.question = question.question;
  formatted.questionType = "Short Answer";
  formatted.answers = [question.answer];
  formatted.questionSource = "Round 12210";
  formatted.competition = "Mathleague";
  formatted.questionCategory = ["Countdown"];
  Question.create(formatted);
