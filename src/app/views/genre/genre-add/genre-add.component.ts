import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { noSpace } from '../../../shared/custom-validators/nospacesvalidator';

@Component({
  selector: 'app-genre-add',
  templateUrl: './genre-add.component.html',
  styleUrls: ['./genre-add.component.scss']
})
export class GenreAddComponent implements OnInit {
  addForm: FormGroup;
  formSubmitted: boolean = false;
  subscriptions: Subscription[] = [];
  isLoading: boolean = false;

  constructor(
    private commonService: CommonService,
    private helperService: HelperService,
    private _formBuilder: FormBuilder,
    private router: Router
  ) { }

  // Create Form
  createForm() {
    this.addForm = this._formBuilder.group({
      name: ['', [Validators.required, noSpace]]
    })
  }

  ngOnInit(): void {
    this.createForm();
  }

  // Get Form Control
  get f() {
    return this.addForm.controls;
  }

  // Add Genre
  addGenre() {
    this.formSubmitted = true;
    if(this.addForm.invalid) return;

    this.isLoading = true;
    let requestConfig = {
      name: this.addForm.get('name').value
    }
    this.subscriptions.push(
      this.commonService.postAPICall({
        url: 'genre-add',
        data: requestConfig
      }).subscribe((result)=>{
        this.isLoading = false;
        if(result.status == 200) {
          this.helperService.showSuccess(result.msg);
          this.router.navigate(['/genre/list'])
        }
        else{
          this.helperService.showError(result.msg);
        }
      },(err)=>{
        this.isLoading = false;
        this.helperService.showError(err.error.msg);
      })
    )
  }

  ngOnDestroy() {
    for(let sub of this.subscriptions) {
      if(sub) {
        sub.unsubscribe();
      }
    }
  }

}
