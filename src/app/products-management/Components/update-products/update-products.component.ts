
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../Services/category.service';
import { ICategory } from '../../Interfaces/icategory';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment.prod';
import { GovernoratesService } from '../../Services/governorates.service';
import { IGovernorates } from '../../Interfaces/igovernorates';
@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.scss'],
  providers: [MessageService]
})
export class UpdateProductsComponent implements OnInit {
  backendurl: string = environment.imageurl;
  text!: string  ;
  formProduct: FormGroup;
  imageP: any[] = [];
  images: any[] = [];  // to store the selected images
  categories!: ICategory[]
  product!: IProduct;
  productId!: string;
  governorates: IGovernorates[] = []

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

  constructor(private _categoryService: CategoryService, private _product: ProductService,
    private fb: FormBuilder, private route: ActivatedRoute, private messageService: MessageService,private _governoratesService: GovernoratesService,) {
    this.formProduct = this.fb.group({
      nameAr: new FormControl(null, [Validators.required]),
      descAr: new FormControl(null, [Validators.required]),
      detailAr: new FormControl( '', [Validators.required]),
      categoryId: new FormControl(null, [Validators.required]),
      id: new FormControl(null),
      videoUrl: new FormControl(),
      showHome: new FormControl(false),
      files: new FormControl([]),  // initialize images control to hold file list
      LocationIds: new FormControl<IGovernorates[] | null>([]),
    });
  }

  ngOnInit(): void {
    this.showCategory();
    this.showGovernorates();
    this.route.params.subscribe(params => {
      this.productId = params['id'];  // Get 'id' from the URL
      this.getProduct(params['id']);
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

  changeFile(event: any) {
  }

  getProduct(id: string) {
    this._product.getProduct(id).subscribe({
      next: (response) => {
        this.product = response.data;
        this.formProduct.patchValue(response.data)
      },
      error: (err) => {
        console.log(err);
      },
    });

  }

  updateProduct() {
    const formData = new FormData();
    formData.append('nameAr', this.formProduct.value.nameAr);
    formData.append('descAr', this.formProduct.value.descAr);
    formData.append('detailAr', this.formProduct.value.detailAr);
    formData.append('categoryId', this.formProduct.value.categoryId);
    formData.append('showHome', this.formProduct.value.showHome);
    formData.append('videoUrl', this.formProduct.value.videoUrl);
    formData.append('id', this.productId);
    formData.append('LocationIds', this.formProduct.value.LocationIds);
    this.images.forEach(image => {
      formData.append('files', image.file, image.file.name);  // append each image to FormData
    });

    debugger
    this._product.updateProduct(formData).subscribe({
      next: (response) => {
        if (response.statusCode == 200) {
          this.messageService.add({ severity: 'success', summary: 'تنبيه', detail: 'تم التعديل بنجاح   ' });
          this.getProduct(this.productId);
          this.images = [];
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: response.message });
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: err.message });
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
    debugger
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

  deleteImage(imgId: number) {
    let imageObj = {
      productId: this.productId,
      imageId: imgId
    };
    this._product.deleteProductImage(imageObj).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'info', summary: 'تنبيه', detail: 'تم الحذف   ' });
        this.getProduct(this.productId);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: err.message });
      },
    });
  }
}
