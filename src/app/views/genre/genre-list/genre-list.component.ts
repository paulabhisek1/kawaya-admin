import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';

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
        this.helperService.showError(err.error.message);
      })
    )
  }

  // Start Search
  startSearch() {
    if(this.search) {
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

}
