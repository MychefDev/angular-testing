import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  @Input() user: User = {} as User;
  @Output() userLogout: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  logout() {
    this.userLogout.emit();
  }

  updateUser(newUser: User) {
    this.user = newUser;
  }

  getFullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }
}
