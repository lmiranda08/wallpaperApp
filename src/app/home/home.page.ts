import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  result: any [] = [];
  resultStart: any [] = [];
  error;
  page = 1;
  segmentModel = "home";
  optionsImage = {
    share: true, // default is false
    closeButton: false, // default is true
    copyToReference: true, // default is false
    headers: '',  // If this is not provided, an exception will be triggered
    piccasoOptions: { } // If this is not provided, an exception will be triggered
};

/* PhotoViewer.show('http://my_site.com/my_image.jpg', 'Optional Title', options); */

  constructor( private data: DataService,
               private photoViewer: PhotoViewer
              ) {}

  ngOnInit(){
    this.onStart();
  }

  segmentChanged(ev: any) {
  }

  onSearchChange( e ){
    const searchValue = e.detail.value;
    if (searchValue && searchValue.trim() != '') {
      if(searchValue.length < 3) {
        this.error = 'Please enter 3 words';
        this.page = 0;
        this.onStart();
        return;
      }else{
        this.result = [];
        this.data.searchImage(searchValue).subscribe( res => {
          for (let index = 0; index < res.length; index++) {
            const element = res[index].src['tiny'];
            this.result.push(element)
          }
        })
      }
    }
  }

  onStart(loadMore = false, event?) {
    if (loadMore) {
      this.page += Math.floor(Math.random()*101);
    }
    this.data.searchCurated(this.page).subscribe( (res:any) => {
/*       for (let index = 0; index < res.length; index++) { */
/*         const element = res[index].src['tiny'];
        this.resultStart.push(element); */
        this.resultStart = res;
  /*     } */
      if( event ){
        event.target.complete();
      }
    })
  }
}

