import { Component } from '@angular/core';

@Component({
  selector: 'app-chronometer',
  templateUrl: './chronometer.component.html',
  styleUrls: ['./chronometer.component.css']
})
export class ChronometerComponent {
  time: number = 0;
  countdownTime: number = 0;
  interval: any;
  isRunning: boolean = false;
  isCountdown: boolean = false;

  startChronometer() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.interval = setInterval(() => {
        this.time++;
      }, 1000);
    }
  }

  pauseChronometer() {
    this.isRunning = false;
    clearInterval(this.interval);
  }

  resetChronometer() {
    this.pauseChronometer();
    this.time = 0;
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  startCountdown() {
    if (this.countdownTime !== null && this.countdownTime > 0) {
      this.isCountdown = true;
      this.interval = setInterval(() => {
        if (this.countdownTime! > 0) {
          this.countdownTime!--;
        } else {
          clearInterval(this.interval);
          this.isCountdown = false;
          alert('Countdown finished!');
        }
      }, 1000);
    }
  }

  setCountdownTime(event: any) {
    const value = event.target.value;
    this.countdownTime = parseInt(value, 10);
  }

  clearCountdown() {
    clearInterval(this.interval);
    this.countdownTime = 0;
    this.isCountdown = false;
  }
}
