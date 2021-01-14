import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
})
export class ImagePage implements OnInit {
  image:string;
  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit() {

  }

  detailImage(){
    const index = this.route.snapshot.paramMap.get('index');
    this.data.detailImage(index).subscribe( res => {
      console.log(res);
    })
  }

}
