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
      this.img = res["src"]["tiny"];
    })

  }

  showImage(img: string){
    const options = {
      share: true,
      closeButton: true,
      copyToReference: true,
      headers: '',
      piccasoOptions: { }
  };
    this.photoViewer.show(img, 'Show the image', options)
  }

}
