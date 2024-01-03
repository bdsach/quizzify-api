DROP TABLE IF EXISTS answer;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS quiz;

CREATE TABLE IF NOT EXISTS quiz (
    id TEXT,
    text TEXT,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS question (
    id TEXT PRIMARY KEY,
    text TEXT,
    quiz_id TEXT,
    FOREIGN KEY (quiz_id) REFERENCES quiz(id)
);

CREATE TABLE IF NOT EXISTS answer (
    id TEXT PRIMARY KEY,
    text TEXT,
    is_correct BOOLEAN,
    option TEXT,
    question_id TEXT,
    FOREIGN KEY (question_id) REFERENCES question(id)
);


-- Insert data into quiz table
INSERT INTO quiz (id, title) VALUES
  ('quiz1', 'General Knowledge'),
  ('quiz2', 'Science Quiz');

-- Insert data into question table
INSERT INTO question (id, title, quiz_id) VALUES
  ('q1', 'What is the capital of France?', 'quiz1'),
  ('q2', 'Which planet is known as the Red Planet?', 'quiz2'),
  ('q3', 'Who wrote "Romeo and Juliet"?', 'quiz1'),
  ('q4', 'What is the chemical symbol for water?', 'quiz2'),
  ('q5', 'In which year did World War I begin?', 'quiz1'),
  ('q6', 'What is the largest mammal on Earth?', 'quiz2'),
  ('q7', 'Which country is known as the Land of the Rising Sun?', 'quiz1'),
  ('q8', 'What is the capital of Australia?', 'quiz2'),
  ('q9', 'Who painted the Mona Lisa?', 'quiz1'),
  ('q10', 'What is the powerhouse of the cell?', 'quiz2');

-- Insert data into answer table
INSERT INTO answer (id, title, is_correct, option, question_id) VALUES
  ('a1', 'Paris', 1, 'A', 'q1'),
  ('a2', 'Berlin', 0, 'B', 'q1'),
  ('a3', 'Madrid', 0, 'C', 'q1'),
  ('a4', 'Rome', 0, 'D', 'q1'),
  ('a5', 'Mars', 1, 'A', 'q2'),
  ('a6', 'Venus', 0, 'B', 'q2'),
  ('a7', 'Jupiter', 0, 'C', 'q2'),
  ('a8', 'Saturn', 0, 'D', 'q2'),
  ('a9', 'William Shakespeare', 1, 'A', 'q3'),
  ('a10', 'Jane Austen', 0, 'B', 'q3'),
  ('a11', 'Charles Dickens', 0, 'C', 'q3'),
  ('a12', 'Emily Bronte', 0, 'D', 'q3'),
  ('a13', 'H2O', 1, 'A', 'q4'),
  ('a14', 'CO2', 0, 'B', 'q4'),
  ('a15', 'O2', 0, 'C', 'q4'),
  ('a16', 'N2', 0, 'D', 'q4'),
  ('a17', '1914', 1, 'A', 'q5'),
  ('a18', '1939', 0, 'B', 'q5'),
  ('a19', '1945', 0, 'C', 'q5'),
  ('a20', '1918', 0, 'D', 'q5'),
  ('a21', 'Blue Whale', 1, 'A', 'q6'),
  ('a22', 'Elephant', 0, 'B', 'q6'),
  ('a23', 'Giraffe', 0, 'C', 'q6'),
  ('a24', 'Hippopotamus', 0, 'D', 'q6'),
  ('a25', 'Japan', 1, 'A', 'q7'),
  ('a26', 'China', 0, 'B', 'q7'),
  ('a27', 'South Korea', 0, 'C', 'q7'),
  ('a28', 'India', 0, 'D', 'q7'),
  ('a29', 'Canberra', 1, 'A', 'q8'),
  ('a30', 'Sydney', 0, 'B', 'q8'),
  ('a31', 'Melbourne', 0, 'C', 'q8'),
  ('a32', 'Perth', 0, 'D', 'q8'),
  ('a33', 'Leonardo da Vinci', 1, 'A', 'q9'),
  ('a34', 'Vincent van Gogh', 0, 'B', 'q9'),
  ('a35', 'Pablo Picasso', 0, 'C', 'q9'),
  ('a36', 'Michelangelo', 0, 'D', 'q9'),
  ('a37', 'Mitochondria', 1, 'A', 'q10'),
  ('a38', 'Nucleus', 0, 'B', 'q10'),
  ('a39', 'Endoplasmic Reticulum', 0, 'C', 'q10'),
  ('a40', 'Lysosome', 0, 'D', 'q10');
