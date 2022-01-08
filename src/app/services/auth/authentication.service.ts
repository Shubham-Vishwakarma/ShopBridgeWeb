import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authStatusListener = new Subject<boolean>()
  user: User | null = null;
  isAuthenticated = false;

  constructor(private http: HttpClient) {
  }

  private getLocalUser(): string {
    const u = localStorage.getItem('currentUser');
    if(u)
      return u;
    return '{}';
  }

  public getAuthStatus() {
    const u: string = this.getLocalUser();
    const token: string | null= localStorage.getItem('currentToken');
    const user: User | null = JSON.parse(u);
    if(user && user.token === token) {
      this.isAuthenticated = true;
      this.user = user
    }
  }

  public getAuthStateListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  login(email: string, password: string) {
    return this.http
        .post<User>('http://localhost:5135/api/Auth/login',{ email, password })
        .subscribe((result: User) => {
          this.saveAuthData(result);
          this.authStatusListener.next(true)
          this.isAuthenticated = true;
        },
        (error: any) => {
          this.user = null;
          this.authStatusListener.next(false)
          this.isAuthenticated = false;
        });
  }

  register(name: string, email: string, password: string) {
    return this.http
        .post<User>('http://localhost:5135/api/Auth/register', { name, email, password })
        .subscribe((result: User) => {
          this.saveAuthData(result);
          this.authStatusListener.next(true)
          this.isAuthenticated = true;
        },
        (error: any) => {
          this.user = null;
          this.authStatusListener.next(false)
          this.isAuthenticated = false;
        });
  }

  logout() {
    this.clearAuthData();
    this.authStatusListener.next(false);
    this.isAuthenticated = false;
  }

  saveAuthData(user: User) {
    this.user = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('currentToken', user.token);
  }

  clearAuthData() {
    this.user = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentToken');
  }

}
