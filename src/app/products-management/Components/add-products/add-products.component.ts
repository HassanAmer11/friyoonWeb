import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../Services/category.service';
import { ICategory } from '../../Interfaces/icategory';
import { ProductService } from '../../Services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { IGovernorates } from '../../Interfaces/igovernorates';
import { GovernoratesService } from '../../Services/governorates.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
  providers: [MessageService]
})
export class AddProductsComponent implements OnInit {
  text: string | undefined;
  customOptions: OwlOptions = {
    rtl: true,
    loop: true,
    mouseDrag: true,  // Enable mouse drag
    touchDrag: true,  // Enable touch drag
    pullDrag: true,   // Allow drag pull
    dots: false,
    navSpeed: 700,
    margin: 15,
    navText: ['<i class="fa-solid fa-angle-right"></i>', ' <i class="fa-solid fa-angle-left"></i>'],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 6 }
    },
    nav: true
  };

  formProduct: FormGroup;
  imageP: any[] = [];
  images: any[] = [];  // Array to hold image files and their preview URLs
  categories!: ICategory[]
  governorates: IGovernorates[] = []

  constructor(private _categoryService: CategoryService, private _product: ProductService,private _governoratesService: GovernoratesService,
     private fb: FormBuilder , private messageService: MessageService , private _router: Router) {
    this.formProduct = this.fb.group({
      nameAr: new FormControl(null, [Validators.required]),
      descAr: new FormControl(null, [Validators.required]),
      detailAr: new FormControl(null, [Validators.required]),
      categoryId: new FormControl(null, [Validators.required]),
      id: new FormControl(null),
      videoUrl: new FormControl(),
      showHome: new FormControl(false),
      LocationIds: new FormControl<number[] | null>([]),
      files: new FormControl([])  // initialize images control to hold file list

    });

  }
  ngOnInit(): void {
    this.showCategory();
    this.showGovernorates();
  }
  showCategory() {
    this._categoryService.getCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.categories = response.data;
        console.log(response.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showGovernorates() {
    this._governoratesService.getGovernorates().subscribe({
      next: (response) => {
        console.log(response);
        this.governorates = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  changeFile(event: any) {
  }
  addProduct() {
    debugger
    console.log(this.formProduct.value);
    const formData = new FormData();

    formData.append('nameAr', this.formProduct.value.nameAr);
    formData.append('descAr', this.formProduct.value.descAr);
    formData.append('detailAr', this.formProduct.value.detailAr);
    formData.append('categoryId', this.formProduct.value.categoryId);
    formData.append('showHome', this.formProduct.value.showHome);
    formData.append('videoUrl', this.formProduct.value.videoUrl);
    formData.append('id', '0');
    this.formProduct.value.LocationIds.forEach((id: string | Blob) => {
      formData.append('LocationIds', id);
    });
    this.images.forEach(image => {
      formData.append('files', image.file, image.file.name);  // append each image to FormData
    });


    this.formProduct.patchValue({ id: 0 });
    this._product.addProduct(formData).subscribe({
      next: (response) => {
        console.log(response);
        if (response.statusCode == 200) {
          this.messageService.add({ severity: 'success', summary: 'تنبيه', detail: 'تم الاضافة بنجاح   ' });
          setTimeout(() => {
            this._router.navigate(['../products-management/view-products']); // هنا تحدد المسار الذي ترغب في التوجيه إليه
          }, 2000);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: response.message });
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: err.message });
        console.log(err);

      },
    });
  }

  removeImage(id: any) {
    this.images = this.images.filter(file => file.id !== id)
  }
  generateGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }


  onFileChange(event: any): void {
    console.log(event)
    const files = event.target.files;
    if (files) {
      // Iterate through the files and add them to the images array
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          this.images.push({
            file: file,
            previewUrl: reader.result,
            id: this.generateGUID()
          });
          event.target.value = '';  // Clears selected file
        };
        reader.readAsDataURL(file);  // read the file to preview
      }
    }
  }

}
