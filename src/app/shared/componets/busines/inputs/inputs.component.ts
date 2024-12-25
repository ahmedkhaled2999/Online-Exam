import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { HeadnameComponent } from '../../ui/headname/headname.component';
import { Inputs } from '../../../interface/input/inputs';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ErrocomponetsComponent } from '../errocomponets/errocomponets.component';
import { ButtonComponent } from '../../../../core/componets/button/button.component';
import { ErrapiComponent } from '../errorapi/errapi/errapi.component';
import { RouterLink } from '@angular/router';
import { TextauthComponent } from '../../ui/textauth/textauth.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CallgoogleapiComponent } from "../callgoogleapi/callgoogleapi.component";

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    ErrocomponetsComponent,
    ErrapiComponent,
    HeadnameComponent,
    TextauthComponent,
    NgClass,
    CallgoogleapiComponent,

],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.css',
})
export class InputsComponent {
  // this value send formvalue
  @Output() inputvalu = new EventEmitter<any>();
  // This value receives the input type
  @Input() Input!: Inputs[];
  // This value receives formgroup
  @Input() form!: FormGroup;
  // This value receives headbagesname
  @Input() headbages!: string;
  // to change type inputs from password to text
  passwordVisible: { [key: string]: boolean } = {};
  // to sent data out to parent componet
  outputinput() {
    this.inputvalu.emit(this.form.value);
  }
  // to change type inputs from password to text
  togglePasswordVisibility(controlName: string) {
    this.passwordVisible[controlName] = !this.passwordVisible[controlName];
  }
  // to show border red when inputs errors
  isInvalidAndTouched(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
}
