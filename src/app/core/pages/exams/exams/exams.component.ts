import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamsService } from '../../../../shared/services/exams/exams.service';
import { ExamsUiComponent } from '../../../../shared/componets/ui/exams-ui/exams-ui.component';
import { Exam } from '../../../../shared/interface/examsResponse/examps-res';
import { NotFoundQutionComponent } from '../../../../shared/componets/ui/not-found-qution/not-found-qution.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [ExamsUiComponent, NotFoundQutionComponent],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.css',
})
export class ExamsComponent implements OnInit ,OnDestroy {
  id!: string;
  exams!: Exam[];
  private destroy$ = new Subject<void>();
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _examsService: ExamsService
  ) {
    _activatedRoute.params.subscribe({
      next: (params) => {
        this.id = params['id'];
      },
    });
  }
  getsubjectexms() {
    this._examsService.getexamsubject(this.id).subscribe({
      next: (data) => {
        if ('exams' in data) {
          this.exams = data.exams;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }




  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(takeUntil(this.destroy$)) // Automatically unsubscribe when destroy$ emits
      .subscribe({
        next: (params) => {
          
          this.id = params['id'];
          this.getsubjectexms(); // Call the method to fetch exams when the id is set
        },
      });
  }

  ngOnDestroy(): void {
    // Emit a value to signal that the component is being destroyed
    this.destroy$.next();
    this.destroy$.complete(); // Optionally complete the subject
  }
  
}
