import { TestService } from './../../test.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  albumId;
  datas: any[] = [];
  title;
  playlistCategories: any[] = [];

  constructor(
    private testService: TestService,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit() {
    // this.getNewHitPlayLists();
    this.getScenicSpot();
  }

 Authorization:any = this.testService.getAuthorizationHeader();
 
  onClickalbumId(id: string, title: string) {
    this.testService.setAlbumId(id, title);
    this.router.navigateByUrl('/youtubePage');
    //利用網址列的方式來存ID
    // this.router.navigateByUrl('/youtubePage/?id=' + id);
  }

  onClickToPlayWidgets(id: string, title: string) {
    this.testService.setAlbumId(id, title);
    this.router.navigateByUrl('/playerWidgets');
  }

  //取得每周熱門歌曲排行封面
  getNewHitPlayLists = async () => {
    this.testService.getNewHitPlayLists().subscribe((value) => {
      this.datas = [value];
      this.datas = this.datas[0].data;
      console.log(' this.datas1', this.datas);
    });
  };

  getScenicSpot = async () =>{
    // const Authorization = 'hmac username=\"' + this.AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + this.HMAC + '\"';
    await this.http.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=20&$format=JSON', this.Authorization).subscribe((value) => {
      this.datas = [value];
      this.datas = this.datas[0];
      console.log('test', this.datas);
    });
  } 

}
