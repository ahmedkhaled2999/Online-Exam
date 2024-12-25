import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flex',
  standalone: true,
  imports: [NgClass],
  templateUrl: './flex.component.html',
  styleUrl: './flex.component.css'
})
export class FlexComponent {

  @Input()  STYLE:string =''

}
