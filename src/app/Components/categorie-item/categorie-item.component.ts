import { Component, Input } from '@angular/core';
import { ICategry } from 'src/app/Interfaces/icategry';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-categorie-item',
  templateUrl: './categorie-item.component.html',
  styleUrls: ['./categorie-item.component.scss']
})
export class CategorieItemComponent {
  backendurl: string = environment.imageurl;
  @Input() category!: ICategry;

}
