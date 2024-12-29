import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  signal,
  ViewChild,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { NgClass, NgStyle } from '@angular/common';
import { Router, RouterEvent, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ModalComponent, NgClass, NgStyle, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  show: WritableSignal<boolean> = signal(false);
  isMenuOpen: boolean = false;
  activeIndex: number = 0;
  windowWidth: number = 0;

  router = inject(Router);

  checkwidth() {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth > 550) {
      this.isMenuOpen = false;
    } else {
      this.isMenuOpen = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkwidth();
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    this.checkwidth();
  }

  menuItems = [
    { label: 'Dashboard', icon: 'fa-solid fa-bars' },
    { label: 'History exam', icon: 'fa-solid fa-clock-rotate-left' },
    { label: 'Logout', icon: 'fa-solid fa-right-from-bracket' },
  ];

  gotohome() {
    this.router.navigate(['/home']);
  }

  setActive(index: number) {
    this.activeIndex = index;
  }

  logout() {
    this.show.set(true);
  }
}
