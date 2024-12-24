import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ButtonComponent } from '../../componets/button/button.component';
import { AnimationComponent } from '../../../shared/componets/ui/animation/animation.component';
import { ExamsQuestionComponent } from '../exams-question/exams-question.component';
import { QuestionApiService } from '../../../shared/services/question/question-api.service';
import { Root2 } from '../../../shared/interface/quiztion/answers/answers';
import { LayerComponent } from '../../../shared/componets/ui/layer/layer.component';
import { isPlatformBrowser } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-modal-quizes',
  standalone: true,
  imports: [
    ButtonComponent,
    AnimationComponent,
    ExamsQuestionComponent,
    LayerComponent,
  ],
  templateUrl: './modal-quizes.component.html',
  styleUrl: './modal-quizes.component.css',
})
export class ModalQuizesComponent implements OnInit {
  constructor(private _questionApiService: QuestionApiService) {}
  show: boolean = false;
  showqustion!: boolean;
  @Input() idqustion!: string;
  Question!: Root2[];
  _platform = inject(PLATFORM_ID);
  ngOnInit(): void {
    if (isPlatformBrowser(this._platform)) {
      const show_maodal = localStorage.getItem('show-maodal');
      if (show_maodal === 'true') {
        this.show = true;
        this.getallquestions();
      }
    }
  }

  getallquestions() {
    this._questionApiService
      .getallQuestions(this.idqustion)
      .pipe(take(1)) // Automatically unsubscribe after the first emission
      .subscribe({
        next: (res) => {
          this.Question = res.answers;
          console.log(this.Question);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  openQuestion(question: boolean) {
    setTimeout(() => {
      this.showqustion = question;
    }, 500);
  }

  changeshow() {
    this.getallquestions();
    this.show = true;
    if (isPlatformBrowser(this._platform)) {
      localStorage.setItem('show-maodal', 'true');
    }
  }
}
