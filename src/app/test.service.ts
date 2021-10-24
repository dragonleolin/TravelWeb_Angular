import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, ReplaySubject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HomeData } from './HomeData';

@Injectable({
  providedIn: 'root',
})
export class TestService {

  private getHomeData:HomeData ={
    id: '',
    title: '',
  }
  albumId$ = new BehaviorSubject<HomeData>(this.getHomeData);

  playlistCategories: any[] = [];

  token = '1LjvpR8neL3zawlLQRJ0PQ==';

  
  setAlbumId(id: string, title:string) {
    const HomeData ={
      id: id,
      title: title
    }
    console.log('已設定', HomeData);
    this.albumId$.next(HomeData);

  }

  constructor(private http: HttpClient) {}
  
  // 在HEADER加上金鑰
  getAuthorizationHeader = () => {
    const AppID = 'efee450f49d64a24ad56e17ef7f7a7bc';
    const AppKey ='lg-MSD6lIktZ4bXJJ_5CPGKd9MU';
    const GMTString = new Date().toUTCString();
    const HMAC = 'VzA++ymJtCIYUg/qCc6g8dlOxeQ=';
    const Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
    return { 'Authorization': Authorization/*, 'X-Date': GMTString ,'Accept-Encoding': 'gzip'*/}  //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
    
  }


  send() {
    this.http.get('http://127.0.0.1:3001/get').subscribe({
      next(value) {
        console.log('value', value);
      },
      error(error) {
        console.log('error', error);
      },
      complete() {
        console.log('success');
      },
    });
  }

  getToken() {
    this.http.post('https://account.kkbox.com/oauth2/token', {
      headers: {
        grant_type: 'client_credentials',
        client_id: 'f51a9213d7860d8e6bcc5aee8439ca98',
        client_secret: '75f63964dcfc50f48e77397515a7b19b'
      },
    }).subscribe((res) => {
      console.log('getToken:', res);
    });
  }



  //取得每周熱門歌曲排行封面
  getNewHitPlayLists = () => {
    // console.log(1, this.token);
   return this.http
      .get('https://api.kkbox.com/v1.1/new-hits-playlists?territory=TW', {
        headers: {
          Authorization: `Bearer ` + this.token,
        },
      })
  };

  getPlaylistCategories(){
    return this.http
      .get('https://api.kkbox.com/v1.1/featured-playlist-categories/9XQKD8BJx595ESs_rb?territory=TW&limit=10', {
        headers: {
          Authorization: `Bearer ` + this.token,
        },
      })
  }

  getFeaturedPlaylist() {
    return this.http
      .get('https://api.kkbox.com/v1.1/featured-playlist-categories?territory=TW&limit=10', {
        headers: {
          Authorization: `Bearer ` + this.token,
        },
      })
  }

  getYTData = () => {
    return this.http
      .get(
        'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAta-bAGIsoa8etmOR7LKYprMhJdSNoRPE&part=snippet&type=video&q=[search]',
        {
          headers: {
            Authorization: `Bearer ` + this.token,
          },
        }
      )
      .subscribe((res) => {
        // console.log(5, res);
      });
  };
}
