import { isPlatformBrowser } from '@angular/common';
import {
  Inject,
  Injectable,
  PLATFORM_ID,
  WritableSignal,
  signal,
} from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Jwt } from '../../interface/jwt/jwt';

@Injectable({
  providedIn: 'root',
})
export class JwttokenService {
  // tokenuser: WritableSignal<Jwt> = signal({ id: '', role: '', iat: 0 });
  // Decoded!: Jwt;
  // constructor(@Inject(PLATFORM_ID) private platform: object) {
  //   if (isPlatformBrowser(platform)) {
  //     if (localStorage.getItem('token')) {
  //       this.DecodeJWT();
  //     }
  //   }
  // }

  // DecodeJWT() {
  //   this.Decoded = jwtDecode(JSON.stringify(localStorage.getItem('token')));
  //   this.tokenuser.set(this.Decoded);
  //   console.log(this.tokenuser());
  // }
}
