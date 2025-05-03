import { Component, OnInit } from '@angular/core';
import { GovernoratesService } from '../../Services/governorates.service';
import { IGovernorates } from '../../Interfaces/igovernorates';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-governorates',
  templateUrl: './governorates.component.html',
  styleUrls: ['./governorates.component.scss'],
  providers: [MessageService]
})
export class GovernoratesComponent implements OnInit {
  textSearch:string =''
  isAdd: boolean = false;
  buttonEdit: boolean = false;
  governorates: IGovernorates[] = []
  selectedGovernorate: any = null; // Add this line
  GovernorateIdDelete:number = 0;
  constructor(private _governoratesService: GovernoratesService, private messageService: MessageService) { }


  ngOnInit(): void {
    this.showGovernorates()
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

  formGovernorates: FormGroup = new FormGroup({
    nameAr: new FormControl(null, [Validators.required]),
  }
  );

  addGovernorates(): void {
    console.log(this.formGovernorates);
    this.formGovernorates.value.nameEn = this.formGovernorates.value.nameAr;

    let nameAr: string = this.formGovernorates.value.nameAr.toLocaleLowerCase().trim()
    let govListNameEn = this.governorates.some(gov => gov.nameAr.toLocaleLowerCase() === nameAr.toLocaleLowerCase())


    if (this.formGovernorates.valid) {

        debugger
        if (this.selectedGovernorate) {
          this._governoratesService.updateGovernorates(this.selectedGovernorate.id, this.formGovernorates.value).subscribe({
            next: (response) => {
              console.log(response);
              this.showGovernorates();
              this.isAdd = false;
              this.buttonEdit = false;
              this.formGovernorates.reset();
              this.selectedGovernorate = null;
              this.messageService.add({ severity: 'success', summary: 'تنبيه', detail: 'تم التعديل بنجاح   ' });

            },
            error: (err) => { console.log(err);
              this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: err.message });

            },
          })
        } else {
          if (!govListNameEn) {
          this._governoratesService.addGovernorates(this.formGovernorates.value).subscribe({
            next: (response) => {
              console.log(response);
              this.showGovernorates()
              this.messageService.add({ severity: 'success', summary: 'تنبيه', detail: 'تم الاضافة بنجاح   ' });
            },
            error: (err) => {
              console.log(err);
              this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: err.message });

            },
          })
        } else {
          this.messageService.add({ severity: 'info', summary: 'تنبيه', detail: 'هذه المحافظه موجوده بالفعل' });

        }
        }


    }

  }
  editGovernorates(gov: IGovernorates): void {
    this.isAdd = true;
    this.buttonEdit = true;
    this.selectedGovernorate = gov;
    this.formGovernorates.patchValue(gov)
    window.scrollTo(0, 0);

  }

  deleteGovernorates() {
    this._governoratesService.deleteGovernorates(this.GovernorateIdDelete).subscribe({
      next: (response) => {
        console.log(response);
        this.showGovernorates();
        this.messageService.add({ severity: 'info', summary: 'تنبيه', detail: 'تم الحذف   ' });
        this.GovernorateIdDelete= 0
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: err.message });

      },
    });
  }
  getIdDeleted(id:number ) {
    this.GovernorateIdDelete = id;
  }
}
