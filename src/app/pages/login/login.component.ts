import { Component } from '@angular/core';
import { ApiService } from '../../services/authenticator-service.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    if (this.userLoggedIn()) this.router.navigate(['/home']);
  }

  userLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return token !== null;
  }

  onSubmit() {
    if (!this.usernameCorrectFormat(this.username)) {
      this.errorMessage = 'Invalid email format (e.g. test@mail.com)';
      return;
    }

    const pswdError = this.pswdCorrectFormat(this.password)
    if (pswdError.length > 0) {
      this.errorMessage = pswdError;
      return;
    }

    // DUMY CREDENTIALS:
    // username: emily
    // password: emilyspass
    this.api.loginWithCredentials(this.username, this.password)
      .then(response => {
        const user: User = JSON.parse(response);
        this.processLogin(user);
      })
      .catch(error => {
        this.errorMessage = 'Invalid credentials';
      });
  }

  usernameCorrectFormat(username: string): boolean {
    const usernamePattern = /^[a-zA-Z0-9._-]{3,}$/;
    return usernamePattern.test(username);
  }

  pswdCorrectFormat(password: string): string {
    if (password === '') return 'Pasword can not be empty!';
    if (password.length < 6) return 'Password must have at least 6 characters!';
    if (!/[a-z]/.test(password)) return 'Password must have at least one lowercase letter!';

    return '';
  }

  processLogin(user: User) {
    localStorage.setItem('authToken', user.accessToken);
    localStorage.setItem('user', JSON.stringify(user));

    this.router.navigate(['/home']);
  }
}