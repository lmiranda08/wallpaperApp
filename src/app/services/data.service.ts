import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: string;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {
  photo: Photo;
  apiPhotoSearch = 'https://api.pexels.com/v1/search?query=';
  apiCurated = 'https://api.pexels.com/v1/curated?per_page=10&page=';
  apiFoto = 'https://api.pexels.com/v1/photos/'


  constructor( private http: HttpClient ) { }

  ngOnInit(){
   
  }

  searchImage( value ){
    const headers = new HttpHeaders({
      'Authorization': '563492ad6f9170000100000188c7bc83f6f5407aaf84ebe169e7a947'
    });
    return this.http.get(`${this.apiPhotoSearch}${value}`, {headers})
    .pipe(
      map(
        data => data['photos']
      )
    );
  }

  detailImage( value ){
    const headers = new HttpHeaders({
      'Authorization': '563492ad6f9170000100000188c7bc83f6f5407aaf84ebe169e7a947'
    });
    return this.http.get(`${this.apiFoto}${value}`, {headers})
    .pipe(
      map(
        data => data['photos']
      )
    );
  }
  
  searchCurated(page = Math.floor(Math.random()*101)){
    const headers = new HttpHeaders({
      'Authorization': '563492ad6f9170000100000188c7bc83f6f5407aaf84ebe169e7a947'
    });
    return this.http.get(`${this.apiCurated}${page}`, {headers})
    .pipe( 
      map(
        data => data['photos']
    ));
  }
}
