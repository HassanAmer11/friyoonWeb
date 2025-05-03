import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
  categoryId: number = 0;

  receiveMessage(categoryId: number) {
    this.categoryId = categoryId; // Handle the emitted data
  }
}
