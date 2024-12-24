import { Component, Input, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeexam',
  standalone: true,
  imports: [],
  templateUrl: './timeexam.component.html',
  styleUrl: './timeexam.component.css'
})
export class TimeexamComponent implements OnInit  {

  @Input()  timeout: number = 0; // Timer countdown in seconds
  intervalId: any; // ID for the timer interval
  formattedTime: string = ''; 







ngOnInit(): void {
  this.startTimer()
}




  
  startTimer() {
    // Start the countdown timer
    this.intervalId = setInterval(() => {
      this.timeout -= 1; // Decrement the timeout
      this.updateFormattedTime(); // Update the formatted time display
      if (this.timeout <= 0) {
        clearInterval(this.intervalId); // Stop the timer when it reaches zero
        this.timeout = 0; // Ensure timeout does not go negative
        console.log('Time is up!'); // Log time up message
      }
    }, 1000); // Set the interval to 1 second
  }

  updateFormattedTime(): string {
    // Update the formatted time string for display
    const minutes = Math.floor(this.timeout / 60); // Calculate minutes
    const seconds = this.timeout % 60; // Calculate seconds
    return (this.formattedTime = `${this.padZero(minutes)}:${this.padZero(
      seconds
    )}`); // Format and return time
  }

  padZero(num: number): string {
    // Helper function to pad single digit numbers with a leading zero
    return num < 10 ? `0${num}` : `${num}`;
  }
}
