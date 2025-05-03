import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/products-management/Services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLogin: boolean = false;

  @ViewChildren('footer') footerElements!: QueryList<ElementRef>;

  footerElement!: ElementRef;

  ngAfterViewInit() {
    this.footerElement = this.footerElements.first;
  }

  scrollToFooter() {
    // this.footerElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    let heightPage = window.innerHeight
    console.log(heightPage);

    window.scrollTo({ top: window.outerHeight+3000, behavior:'smooth' });

  }

  constructor(private _loginService:LoginService, private _router:Router) { }
  ngOnInit(): void {
    this._loginService.isLogged.subscribe((data)=>{this.isLogin = data})

  }
  logOut() {
    debugger
    this._loginService.logout();
    this._router.navigate(['../home']);
  }
}
