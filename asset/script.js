(function () {
  var questions = [
    {
      question: "Who did Leonardo Dicaprio play in the 'Titanic'?",
      choices: ["Jack ", "Jack Dawson", "Jack Torrance", "Jack Bauer"],
      correctAnswer: "Jack Dawson",
    },
    {
      question: "What was the yellow robot's name in 'Transformer'?",
      choices: ["Optimus Prime", "Honey Bee", "Bumble Bee", "Stinger"],
      correctAnswer: "Bumble Bee",
    },
    {
      question: "How many movies are there in the 'Harry Potter' series?",
      choices: [6, 7, 8, 9],
      correctAnswer: 7,
    },
    {
      question: "Where were The Lord of the Rings movies filmed?",
      choices: ["Ireland", "Iceland", "New Zealand", "Australia"],
      correctAnswer: "New Zealand",
    },
    {
      question:
        "Which is not the name of a child selected to tour the Wonka factory in Willy Wonka and the Chocolate Factory?",
      choices: ["Billy Warp", "Mike Teavee", "Veruca Salt", "Charlie Bucket"],
      correctAnswer: "Billy Warp",
    },
  ];

  var questionCounter = 0;
  var selections = [];
  var quiz = $("#quiz");
  var timer = document.getElementById('#timer');
  var secondsleft = 60;

  function countDown() {
    timerinterval = setInterval(function() {
      secondsleft--;
      timer.textContent = "Timer:" + secondsleft;

      if(secondsleft === 0) {
        clearInterval(timerinterval);
      }
    }, 1000);
  }

  displayNext();

  $("#next").on("click", function (e) {
    e.preventDefault();

    if (quiz.is(":animated")) {
      return false;
    }
    choose();

    if (isNaN(selections[questionCounter])) {
      alert("Please make a selection!");
    } else {
      questionCounter++;
      displayNext();
    }
  });

  $("#prev").on("click", function (e) {
    e.preventDefault();

    if (quiz.is(":animated")) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  $("#start").on("click", function (e) {
    e.preventDefault();

    if (quiz.is(":animated")) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $("#start").hide();
  });

  function createQuestionElement(index) {
    var qElement = $("<div>", {
      id: "question",
    });

    var header = $("<h2>Question " + (index + 1) + ":</h2>");
    qElement.append(header);

    var question = $("<p>").append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  function createRadios(index) {
    var radioList = $("<ul>");
    var item;
    var input = "";
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $("<li>");
      input = '<input type="radio" name="answer" value=' + i + " />";
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  function displayNext() {
    quiz.fadeOut(function () {
      $("#question").remove();

      if (questionCounter < questions.length) {
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!isNaN(selections[questionCounter])) {
          $("input[value=" + selections[questionCounter] + "]").prop(
            "checked",
            true
          );
        }

        if (questionCounter === 1) {
          $("#prev").show();
        } else if (questionCounter === 0) {
          $("#prev").hide();
          $("#next").show();
        }
      } else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $("#next").hide();
        $("#prev").hide();
        $("#start").show();
      }
    });
  }

  function displayScore() {
    var score = $("<p>", { id: "question" });

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.append(
      "You got " +
        numCorrect +
        " questions out of " +
        questions.length +
        " right!!!"
    );
    return score;
  }
})();
