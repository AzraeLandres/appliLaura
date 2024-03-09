import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent {
  showResults: boolean = false;
  noResults: boolean = false;
  constructor(private movieService: MoviesService) {}

  ngOnInit() {}

  // Questions et réponses
  questions = [
    {
      question: 'Tu as envie de quoi ?',
      answers: [
        { answer: 'Une valeur sûre', choice: 'safe' },
        { answer: 'Une nouveauté', choice: 'new' },
        { answer: 'Surprends moi !', choice: 'random' },
      ],
    },
    {
      question: 'tu as du temps devant toi ?',
      answers: [
        { answer: 'Non ! Hop Hop !', choice: 'short' },
        { answer: 'Un peu', choice: 'medium' },
        { answer: 'Oui, la nuit est jeune !', choice: 'long' },
      ],
    },
    {
      question: 'Un mood précis ?',
      answers: [
        {
          answer: 'Je veux avoir peur',
          choice: '27', //Horror
        },
        {
          answer: 'Je veux fondre...',
          choice: '10749', //Romance
        },
        {
          answer: 'Je veux du hahahaha',
          choice: '35', //Comedy
        },
        {
          answer: 'Je veux investiguer',
          choice: '9648', //Mystery
        },
        {
          answer: "Je veux de l'action !",
          choice: '28', //Action
        },
        {
          answer: 'Je veux du combat !',
          choice: '10752', //War
        },
        {
          answer: "Je veux de l'espace !",
          choice: '878', //ScienceFiction
        },
        {
          answer: "Je veux de l'aventure !",
          choice: '12', //Adventure
        },
        {
          answer: 'Je veux des dessins !',
          choice: '16', //Animation
        },

        {
          answer: "Je veux ce qu'aime Az",
          choice: '14', //Fantasy
        },
        {
          answer: 'Je veux du plot twist',
          choice: '53', //Thriller
        },
        {
          answer: "Je veux m'instruire",
          choice: '99', //Documentary
        },
        {
          answer: 'I want dramaaa !',
          choice: '18', //Drama
        },
      ],
    },
  ];

  currentQuestionIndex = 0;

  // Choix de l'utilisateur
  userChoices: { choice: string }[] = [];
  // formulaire
  myForm = new FormGroup({
    choice: new FormControl('', Validators.required),
  });

  // Fonction pour passer à la question suivante
  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  // Fonction pour revenir à la question précédente
  previousQuestion() {
    this.currentQuestionIndex--;
  }

  // Fonction pour enregistrer les choix de l'utilisateur
  isClicked: boolean = false;
  saveChoice(choice: string): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];

    this.userChoices = this.userChoices.filter((userChoice) => {
      return !currentQuestion.answers.some(
        (answer) => answer.choice === userChoice.choice
      );
    });

    this.userChoices.push({ choice });
    this.isClicked = true;
  }

  // Fonction pour valider formulaire
  onSubmit() {
    this.getFirstChoice();
  }

  finalResult: any = {};
  // Fonction pour savoir si on a va piocher les questions dans la liste de films déjà vu ou dans tmdb
  getFirstChoice() {
    if (this.userChoices.find((choice) => choice.choice === 'safe')) {
      this.getSeenMovies();
    } else if (this.userChoices.find((choice) => choice.choice === 'new')) {
      this.get2ndChoice();
    } else if (this.userChoices.find((choice) => choice.choice === 'random')) {
      const random = Math.floor(Math.random() * 2);

      if (random === 0) {
        this.getSeenMovies();
      } else {
        this.get2ndChoice();
      }
    }
  }

  moviePoster: string = '';

  get3rdChoice(minDuration: string, maxDuration: string): void {
    const MAX_PAGE = 500;
    let results: any[] = [];
    const minRating = 7.5;

    const genreIds = this.questions[2].answers
      .filter((answer) =>
        this.userChoices.find((choice) => choice.choice === answer.choice)
      )
      .map((answer) => Number(answer.choice));

    this.movieService
      .getTmdbMovies(minDuration, maxDuration, genreIds)
      .subscribe((data) => {
        console.log(data);
        this.finalResult = data.results;
        if (this.finalResult.length > 0) {
          this.finalResult =
            this.finalResult[
              Math.floor(Math.random() * this.finalResult.length)
            ];
          this.showResults = true;
        } else {
          this.movieService.currentPage++;
          if (this.movieService.currentPage <= MAX_PAGE) {
            this.get3rdChoice(minDuration, maxDuration);
          } else {
            this.noResults = true;
          }
        }
      });
  }

  get2ndChoice() {
    let minDuration: string = '0';
    let maxDuration: string = '500';

    if (this.userChoices.find((choice) => choice.choice === 'short')) {
      minDuration = '0';
      maxDuration = '90';
    } else if (this.userChoices.find((choice) => choice.choice === 'medium')) {
      minDuration = '90';
      maxDuration = '120';
    } else if (this.userChoices.find((choice) => choice.choice === 'long')) {
      minDuration = '120';
      maxDuration = '500';
    }

    this.get3rdChoice(minDuration, maxDuration);
  }

  // Fonction pour prendre les films déjà vu
  getSeenMovies() {
    this.movieService.getMovies().subscribe((data) => {
      if (data.filter((movie) => movie.seen === true)) {
        this.finalResult = data.filter((movie) => movie.seen === true);
      }
    });
    this.SeenSecond();
  }

  SeenSecond() {
    let minDuration: number = 0;
    let maxDuration: number = 500;

    if (this.userChoices.find((choice) => choice.choice === 'short')) {
      minDuration = 0;
      maxDuration = 90;
    } else if (this.userChoices.find((choice) => choice.choice === 'medium')) {
      minDuration = 90;
      maxDuration = 120;
    } else if (this.userChoices.find((choice) => choice.choice === 'long')) {
      minDuration = 120;
      maxDuration = 500;
    }

    const genreIds = this.questions[2].answers
      .filter((answer) =>
        this.userChoices.find((choice) => choice.choice === answer.choice)
      )
      .map((answer) => Number(answer.choice));

    console.log(minDuration, maxDuration, genreIds);

    this.movieService
      .getMoviesByDuration(minDuration, maxDuration)
      .subscribe((data) => {
        this.finalResult = data;
        this.seenThird();
      });
  }

  seenThird() {
    let results: any[] = [];
    for (let i = 0; i < this.questions[2].answers.length; i++) {
      if (
        this.userChoices.find(
          (choice) => choice.choice === this.questions[2].answers[i].choice
        )
      ) {
        const genreId = Number(this.questions[2].answers[i].choice);

        const filtered = this.finalResult.filter((movie: Movie) => {
          return movie.genre.id === genreId;
        });

        results = [...results, ...filtered];
        console.log(results);
      }
    }

    if (results.length > 0) {
      this.finalResult = results[Math.floor(Math.random() * results.length)];
      this.showResults = true;
    } else {
      this.noResults = true;
    }
  }

  isSelected(choice: string): boolean {
    return this.userChoices.some((userChoice) => userChoice.choice === choice);
  }

  newResult() {
    if (this.userChoices.find((choice) => choice.choice === 'safe')) {
      this.seenThird();
    } else if (this.userChoices.find((choice) => choice.choice === 'new')) {
      console.log('bruh');
      this.get2ndChoice();
    } else if (this.userChoices.find((choice) => choice.choice === 'random')) {
      const random = Math.floor(Math.random() * 2);

      if (random === 0) {
        this.seenThird();
      } else {
        this.get2ndChoice();
      }
    }
  }
}
