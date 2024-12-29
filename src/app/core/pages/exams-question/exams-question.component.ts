import { isPlatformBrowser, NgClass, NgFor, NgIf } from '@angular/common';
import {
  Root,
  Root2,
} from '../../../shared/interface/quiztion/answers/answers';
import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ButtonComponent } from '../../componets/button/button.component';
import { NotFoundQutionComponent } from '../../../shared/componets/ui/not-found-qution/not-found-qution.component';
import { ShowResulatComponent } from '../../../shared/componets/ui/show-resulat/show-resulat.component';

import {
  Answerqustion,
  HistoryAnswer,
} from '../../../shared/interface/historyAnswer/history-answer';
import { QuestionApiService } from '../../../shared/services/question/question-api.service';
import { take } from 'rxjs';
import { TimeexamComponent } from '../../../shared/componets/busines/timeexam/timeexam.component';

@Component({
  selector: 'app-exams-question',
  standalone: true,
  imports: [
    ButtonComponent,
    NgClass,
    NotFoundQutionComponent,
    ShowResulatComponent,
    TimeexamComponent,
  ],
  templateUrl: './exams-question.component.html',
  styleUrl: './exams-question.component.css',
})
export class ExamsQuestionComponent implements OnInit {
  constructor(private _questionApiService: QuestionApiService) {}

  @Input() Question!: Root; // Input property to receive questions

  isdisabled: boolean = true; // Flag to disable answer selection
  backdisabled: boolean = false; // Flag to disable the back button
  selectedQuestionIndex: number = 0; // Index of the currently selected question
  changebgInput!: string; // Variable to hold the background color for the selected answer

  selectedAnswers: string[] = []; // Array to store selected answers
  answeredQuestions: boolean[] = []; // Array to track which questions have been answered

  farthestQuestionReached: number = 0; // Tracks the farthest question index reached
  timeoutt: number = 0; // Timer countdown in seconds

  showResult: boolean = true; // Flag to control the display of results

  correctAnswers: Root2[] = []; // Array to store correct answers
  wrongAnswers: Root2[] = []; // Array to store wrong answers

  allAnswer!: HistoryAnswer;

  answerStates: boolean[] = []; // Array to track the correctness of each answer

  _platform = inject(PLATFORM_ID);
  ngOnInit() {
    if (isPlatformBrowser(this._platform)) {
      const savedState = localStorage.getItem('quizState');
      if (savedState) {
        const state = JSON.parse(savedState);
        this.selectedQuestionIndex = state.selectedQuestionIndex;
        this.selectedAnswers = state.selectedAnswers;
        this.answeredQuestions = state.answeredQuestions;
        this.farthestQuestionReached = state.farthestQuestionReached;
        this.timeoutt = state.timeout;
        // this.startTimer(); // Start the timer
      } else {
        if (this.Question.length === 0) {
          // Handle case where there are no questions
        } else {
          this.timeoutt = this.Question[0].duration * 60;
          console.log(this.timeoutt);
          // this.startTimer(); // Start the timer
        }
      }
    }
  }

  get selectedQuestion() {
    // Getter to return the currently selected question
    return this.Question[this.selectedQuestionIndex];
  }

  getqustion(key: string) {
    // Handle answer selection for a question
    this.isdisabled = false; // Enable answer selection
    this.changebgInput = key; // Set the background color for the selected answer

    // Store the selected answer and mark the question as answered
    this.selectedAnswers[this.selectedQuestionIndex] = key;
    this.answeredQuestions[this.selectedQuestionIndex] = true;

    this.saveState();
  }
  nextQuestion() {
    // Move to the next question
    this.isdisabled = true; // Disable answer selection
    this.backdisabled = false; // Enable back button

    const selectedAnswer = this.selectedAnswers[this.selectedQuestionIndex];
    console.log(this.selectedQuestion.answers);
    if (selectedAnswer) {
      // Store the selected answer in the current question object
      this.selectedQuestion.Personsanswer = selectedAnswer;

      // Check if the answer is correct or wrong
      if (
        selectedAnswer === this.Question[this.selectedQuestionIndex].correct
      ) {
        console.log('correct');
        this.answerStates[this.selectedQuestionIndex] = true; // Mark as correct
      } else {
        console.log('wrong');
        this.answerStates[this.selectedQuestionIndex] = false; // Mark as wrong
      }
    }

    // Update the correctAnswers and wrongAnswers arrays

    // Move to the next question if available
    if (this.selectedQuestionIndex < this.Question.length - 1) {
      this.selectedQuestionIndex++;

      // Update the farthest question reached
      if (this.selectedQuestionIndex > this.farthestQuestionReached) {
        this.farthestQuestionReached = this.selectedQuestionIndex;
      }

      // Update the background color for the new selected question
      this.changebgInput =
        this.selectedAnswers[this.selectedQuestionIndex] || '';
    } else {
      this.showResult = false; // No more questions, show results
      localStorage.setItem('showResult', 'false');

      this.allAnswer = this.collectAnswers();
      console.log(this.allAnswer);

      this.callapi();
    }

    this.updateAnswerArrays();

    this.saveState();
  }

  previousQuestion() {
    // Move to the previous question
    this.isdisabled = false; // Enable answer selection
    if (this.selectedQuestionIndex > 0) {
      // Ensure we are not at the first question
      this.selectedQuestionIndex--; // Decrement the question index
      this.backdisabled = this.selectedQuestionIndex === 0; // Disable back button if at first question

      // Update the background color for the newly selected question
      this.changebgInput =
        this.selectedAnswers[this.selectedQuestionIndex] || '';

      // Update the answer states based on the previous question
      this.updateAnswerArrays();
    }
    this.saveState();
  }

  updateAnswerArrays() {
    // Clear the arrays
    this.correctAnswers = [];
    this.wrongAnswers = [];

    // Populate the arrays based on the answer states
    for (let i = 0; i < this.Question.length; i++) {
      const questionWithAnswer = {
        ...this.Question[i], // Spread the question properties
        Personsanswer: this.selectedAnswers[i], // Add the selected answer
      };

      if (this.answerStates[i]) {
        this.correctAnswers.push(questionWithAnswer);
      } else if (this.selectedAnswers[i]) {
        this.wrongAnswers.push(questionWithAnswer);
      }
    }
  }
  collectAnswers(): HistoryAnswer {
    const answers: Answerqustion[] = this.Question.map((question, index) => ({
      questionId: question.id!, // Assuming each question has a unique 'id' property
      correct: this.selectedAnswers[index] || '', // Store the selected answer or an empty string if none
    }));

    return {
      answers: answers,
      time: this.timeoutt, // Store the remaining time
    };
  }

  callapi() {
    this._questionApiService
      .cheackHistory(this.allAnswer)
      .pipe(take(1)) // Automatically unsubscribe after the first emission
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  saveState() {
    const state = {
      selectedQuestionIndex: this.selectedQuestionIndex,
      selectedAnswers: this.selectedAnswers,
      answeredQuestions: this.answeredQuestions,
      farthestQuestionReached: this.farthestQuestionReached,
      timeout: this.timeoutt,
    };

    if (isPlatformBrowser(this._platform)) {
      localStorage.setItem('quizState', JSON.stringify(state));
    }
  }
}
