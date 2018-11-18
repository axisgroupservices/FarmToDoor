import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { Category, Database } from '../../providers/database';
/**
 * Generated class for the Home page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  adsSliders = [
    {
      image: 'assets/img/home/ads01.png',
      title: 'Flat <span>15%</span> off',
      
      category: '0100'
    }
  ];


  smallAds = [
    [
      {
        image: 'url(assets/img/home/kids01.png)',
        trustImage: null,
        title: 'Goats'
      },
      {
        image: 'url(assets/img/home/women01.png)',
        trustImage: null,
        title: 'Chicken'
      },
      {
        image: 'url(assets/img/home/men01.png)',
        trustImage: null,
        title: 'Lamb'
      },
    ]
  ];
  adsCount: number = 0;
  menuItems: Category[];
  @ViewChild('sliders') slider: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
    this.smallAds.forEach(ads => {
      ads.forEach(item => {
        item.trustImage = this.sanitizer.bypassSecurityTrustStyle(item.image);
      });
    });
    let db = Database.getInstance();
    this.menuItems = db.parentCategory();
  }

  ionViewDidEnter() {
    var detail = this.navParams.get('detail');
    var parent = this.navParams.get('parent');
    if(detail !== undefined) {
      this.navParams.data.detail = undefined;
      this.navCtrl.push('CategoriesPage', {menus: parent, select: detail});
    }
  }

  ionViewDidLoad() {
    console.log('HomePage');
  }

  slideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    if (currentIndex < 6) {
      this.adsCount = currentIndex;
      console.log(currentIndex);
    }
    console.log(this.smallAds[this.adsCount][0]);
  }

  categories(id: string) {
    this.menuItems.forEach(item => {
      if(item.id === id) {
        this.navCtrl.push('CategoriesPage', {menus: item, select: item.children[0].name.toLowerCase()});
      }
    })
  }
}
