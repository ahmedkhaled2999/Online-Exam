declare var google: any;

import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-callgoogleapi',
  standalone: true,
  imports: [],
  templateUrl: './callgoogleapi.component.html',
  styleUrl: './callgoogleapi.component.css',
})
export class CallgoogleapiComponent  {
  // ngOnInit(): void {
  //   console.log('google api');
  //   google.accounts.id.initialize({
  //     client_id:
  //       '596908990928-3e4sv1oejk1311g5egeqsnmb49t1t31o.apps.googleusercontent.com',
  //     callback: (res: any) => this.handlelogin(res),
  //   });

  //   google.accounts.id.renderButton(document.getElementById('google-account'), {
  //     theme: 'primary',
  //     size: 'large',
  //     shape: 'rectagle',
  //     while: '320',
  //   });
  // }

  // router = inject(Router);

  // decodeJWTToken(token: any) {
  //   return JSON.parse(atob(token.split('.')[1]));
  // }

  // handlelogin(res: any) {
  //   if (res) {
  //     console.log(res);

  //      const responsePayload = this.decodeJWTToken(res.credential);
  //      console.log(responsePayload);

  //      localStorage.setItem('token', JSON.stringify(responsePayload.
  //       jti
  //       ));
  //      this.router.navigate(['/home']); // Navigate to your desired page
  //   }
  // }
}
