import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  constructor(private MessageService: MessageService) {}
  @ViewChildren('footer') footerElements!: QueryList<ElementRef>;

  footerElement!: ElementRef;

  ngAfterViewInit() {
    this.footerElement = this.footerElements.first;
  }

  scrollToFooter() {
    this.footerElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
