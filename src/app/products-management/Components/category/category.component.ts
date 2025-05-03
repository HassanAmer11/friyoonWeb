import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../Interfaces/icategory';
import { CategoryService } from '../../Services/category.service';
import { environment } from 'src/environments/environment.prod';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [MessageService]
})
export class CategoryComponent implements OnInit {
  backendurl: string = environment.imageurl;
  textSearch: string = '';
  isAdd: boolean = false;
  buttonEdit: boolean = false;
  getCategory: ICategory[] = [];
  selectedCategory: any = null; // Add this line
  imageP: File | null = null;
  iconP: File | null = null;
  uploadSuccess: boolean = false;
  formCategory: FormGroup;

  fileUploadForm: any;
  idCategoryDelete!:number
  constructor(
    private _categoryService: CategoryService,
    private fb: FormBuilder,
    private messageService: MessageService
  )
  {
    this.formCategory = this.fb.group({
      id: new FormControl(null),
      nameAr: new FormControl(null, [Validators.required]), //Validators.pattern(/^[\u0600-\u06FF\s]+$/)
      //nameEn: new FormControl(null, [Validators.required]), //Validators.pattern(/^[a-zA-Z\s]+$/)
      imagefile: new FormControl(null),
      iconfile: new FormControl(null),
      descriptionAr: new FormControl(null, [Validators.required]),
    });
  }

  onFileSelected(file: File): void {
    this.imageP = file;
    this.formCategory.patchValue({ imagefile: file });
  }

  onIconeSelected(file: File): void {
    this.iconP = file;
    this.formCategory.patchValue({ iconfile: file });
  }
  ngOnInit(): void {
    this.showCategory();
  }

  showCategory() {
    this._categoryService.getCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.getCategory = response.data;
        console.log(response.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addCategory(): void {
    this.formCategory.value.imagefile = this.imageP;
    this.formCategory.value.iconfile = this.iconP;
    this.formCategory.value.descriptionAr = this.formCategory.value.descriptionAr;


    let nameAr: string = this.formCategory.value.nameAr.toLocaleLowerCase().trim()
    let catListNameEn = this.getCategory.some(gov => gov.nameAr.toLocaleLowerCase() === nameAr.toLocaleLowerCase())

    debugger
    if(this.formCategory.valid) {

        if(this.selectedCategory) {

          this._categoryService.updateCategory(this.formCategory.value).subscribe({
            next: (response) => {
              console.log(response);
              if (response.statusCode == 200) {
                this.showCategory();
                this.isAdd = false;
                this.buttonEdit = false;
                this.formCategory.reset();
                this.selectedCategory = null;
                this.messageService.add({ severity: 'success', summary: 'تنبيه', detail: 'تم التعديل بنجاح   ' });
              }
              else {
                this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: response.message });
              }

            },
            error: (err) => {
              console.log(err);
              this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: err.message });

            },
          });

        } else {
          if(!catListNameEn) {
            this._categoryService.AddCategory(this.formCategory.value).subscribe({
              next: (response) => {
                if (response.statusCode == 200) {
                  console.log(response);
                  this.showCategory();
                  this.isAdd = false;
                  this.buttonEdit = false;
                  this.formCategory.reset();
                  this.messageService.add({ severity: 'success', summary: 'تنبيه', detail: 'تم الإضافة بنجاح   ' });
                }
                else {
                  this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: response.message });
                }

              },
              error: (err) => {
                console.log(err);
                this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: err.message });

              },
            });
          } else {
            alert('This Category is already exist')
          }
        }
    }


  }

  editCategory(category: ICategory) {
    this.isAdd = true;
    this.buttonEdit = true;
    this.selectedCategory = category;
    this.formCategory.patchValue(category)
    window.scrollTo(0, 0);
  }
  deleteCategory() {
    this._categoryService.deleteCategory(this.idCategoryDelete).subscribe({
      next: (response) => {
        console.log(response);
        this.showCategory();
        this.messageService.add({ severity: 'success', summary: 'تنبيه', detail: 'تم الحذف بنجاح   ' });
        this.idCategoryDelete= 0
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: err.message });

      },
    });
  }
  CategoryDelete(id: number) {
    this.idCategoryDelete  =id
  }
}
