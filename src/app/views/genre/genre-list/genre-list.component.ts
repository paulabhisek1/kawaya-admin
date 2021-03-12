import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {
  subscriptions: Subscription[] = [];
  page: number = 1;
  isLoading: boolean = false;
  genreList = [];
  totalGenre: number = 0;
  search: string = '';

  constructor(
    private commonService: CommonService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.getGenreList(); // Fetch Genre List
  }

  // Fetch Genre List
  getGenreList() {
    let requestConfig = {
      page: this.page,
      search: this.search
    }
    requestConfig = JSON.parse(JSON.stringify(requestConfig));
    this.isLoading = true;
    this.subscriptions.push(
      this.commonService.getAPICall({
        url: 'genre-list',
        data: requestConfig
      }).subscribe((result)=>{
        this.isLoading = false;
        if(result.status == 200) {
          if(this.page == 1) {
            this.genreList = [];
          }

          for(let item of result.data.genre_list) {
            this.genreList.push(item);
          }

          this.totalGenre = result.data.total_count;
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
      this.getGenreList();
    }
  }

  // Clear Search
  clearSearch() {
    if(this.search) {
      this.search = '';
      this.page = 1;
      this.getGenreList();
    }
  }

  // On Scroll Pagination
  onScroll() {
    if (this.isLoading) {
      return
    }

    if (this.totalGenre > this.genreList.length) {
      this.page++;
      this.getGenreList()
    }
  }

  // Open Delete Confirmation
  openDeleteConfirmation(genreID) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this genre ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteGenre(genreID)
      } 
    })
  }

  // Delete Genre API Call
  deleteGenre(genreID) {
    this.isLoading = true;
    this.subscriptions.push(
      this.commonService.deleteAPICall({
        url: `delete-genre/${genreID}`,
      }).subscribe((result)=>{
        this.isLoading = false;
        if(result.status == 200) {
          this.helperService.showSuccess(result.msg);
          this.page = 1;
          this.search = '';
          this.getGenreList();
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
