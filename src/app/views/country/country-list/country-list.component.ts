import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  subscriptions: Subscription[] = [];
  page: number = 1;
  isLoading: boolean = false;
  countryList = [];
  totalCountry: number = 0;
  search: string = '';

  constructor(
    private commonService: CommonService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.fetchCountryList(); // Fetching Country Listing
  }

  // Fetch Country Listing
  fetchCountryList() {
    let requestConfig = {
      page: this.page,
      search: this.search
    }
    requestConfig = JSON.parse(JSON.stringify(requestConfig));
    this.isLoading = true;
    this.subscriptions.push(
      this.commonService.getAPICall({
        url: 'country-list',
        data: requestConfig
      }).subscribe((result)=>{
        this.isLoading = false;
        if(result.status == 200) {
          if(this.page == 1) {
            this.countryList = [];
          }

          for(let item of result.data.country_list) {
            this.countryList.push(item);
          }

          this.totalCountry = result.data.total_count;
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

  // Start Search
  startSearch() {
    if((this.search && this.search.length >= 3) || (this.search === '')) {
      this.page = 1;
      this.fetchCountryList();
    }
  }

  // Clear Search
  clearSearch() {
    if(this.search) {
      this.search = '';
      this.page = 1;
      this.fetchCountryList();
    }
  }

  // Open Status Change Confirmation
  openConfirmation(countryID) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to change status of this country ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.statusChangeCountry(countryID)
      } 
    })
  }

  // Status Change Country
  statusChangeCountry(countryID) {
    this.isLoading = true;
    this.subscriptions.push(
      this.commonService.putAPICall({
        url: `country-status-change/${countryID}`
      }).subscribe((result)=>{
        this.isLoading = false;
        if(result.status == 200) {
          this.helperService.showSuccess(result.msg);
          this.page = 1;
          this.fetchCountryList();
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

  // On Scroll Pagination
  onScroll() {
    if (this.isLoading) {
      return
    }

    if (this.totalCountry > this.countryList.length) {
      this.page++;
      this.fetchCountryList()
    }
  }

  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

}
