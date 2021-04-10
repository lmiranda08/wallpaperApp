import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {
  photo: Photo;
  apiPhotoSearch = 'https://api.pexels.com/v1/search?query=';
  apiCurated = 'https://api.pexels.com/v1/curated?per_page=10&page=';
  apiFoto = 'https://api.pexels.com/v1/photos/'

  get headers() {
    return {
      Authorization: '563492ad6f9170000100000188c7bc83f6f5407aaf84ebe169e7a947'
    }
  }

  constructor( private http: HttpClient ) { }

  ngOnInit(){
   
  }

  searchImage( value ){
    return this.http.get(`${this.apiPhotoSearch}${value}`, {headers: this.headers})
    .pipe(
      map(
        data => data['photos']
      )
    );
  }

  detailImage( value: string ){
    return this.http.get(`${this.apiFoto}${value}`, {headers: this.headers});
  }

  
  searchCurated(page = Math.floor(Math.random()*101)){
    return this.http.get(`${this.apiCurated}${page}`, {headers: this.headers})
    .pipe( 
      map(
        data => data['photos']
    ));
  }
}
