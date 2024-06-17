import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersKey = 'registeredUsers';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private isAuthenticatedValue: boolean = false;

  constructor() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserSubject = new BehaviorSubject<any>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(name: string, email: string, password: string): boolean {
    let users = this.getRegisteredUsers();
    if (users.some(user => user.email === email)) {
      return false;
    }
    const newUser = { name, email, password };
    users.push(newUser);
    this.saveRegisteredUsers(users);
    this.setCurrentUser(newUser);
    return true;
  }

  login(email: string, password: string): boolean {
    let users = this.getRegisteredUsers();
    let user = users.find(user => user.email === email && user.password === password);
    if (user) {
      this.isAuthenticatedValue = true;
      this.setCurrentUser(user);
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedValue;
  }

  logout(): void {
    this.isAuthenticatedValue = false;
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  private setCurrentUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private getRegisteredUsers(): any[] {
    let users = localStorage.getItem(this.usersKey);
    return users ? JSON.parse(users) : [];
  }

  private saveRegisteredUsers(users: any[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }
}
