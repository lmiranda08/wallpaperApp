import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
})
export class ImagePage implements OnInit {
  photo: any = [];
  img: any = [];
  constructor(private route: ActivatedRoute, 
              private data: DataService,
              private photoViewer: PhotoViewer) { }

  ngOnInit() {
    this.detailImage();
  }

  detailImage(){
    const index = this.route.snapshot.paramMap.get('index');
    this.data.detailImage(index).subscribe( res => {
      this.photo = res;
      this.img = res.src["tiny"];
    })

  }

  showImage(img: string){
    const options = {
      share: true, // default is false
      closeButton: true, // default is true
      copyToReference: true, // default is false
      headers: '',  // If this is not provided, an exception will be triggered
      piccasoOptions: { } // If this is not provided, an exception will be triggered
  };

    this.photoViewer.show(img, 'Show the image', options)
  }

}
