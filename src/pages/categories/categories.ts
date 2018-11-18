import { Component, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController, Content } from 'ionic-angular';
import { IScrollTab, ScrollTabsComponent } from '../../components/scrolltabs';
import { Category, Product, Database } from '../../providers/database';

@Pipe({ name: 'byCategory' })
export class ByCategoryPipe implements PipeTransform {
  transform(products: Product[], category: Category) {
    return products.filter(product => {
      return product.categories.indexOf(category) >= 0;
    });
  }
}

/**
 * Generated class for the Categories page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {
  tabs: IScrollTab[] = [];
  selectedTab: IScrollTab;
  db: Database;
  products: Product[];
  categories: Category[] = Array<Category>();
  menus: Category = new Category();
  show: boolean = true;
  @ViewChild('scrollTab') scrollTab: ScrollTabsComponent;
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, private modalCtrl: ModalController) {
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'ecom9');
    this.show = true;
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true, 'ecom9');
    this.show = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
    this.db = Database.getInstance();
    this.products = this.db.allProduct();
    var detail = this.navParams.get('select');
    this.menus = this.navParams.get('menus');
    if (this.menus) {
      this.categories = this.menus.children;
      this.menus.children.forEach(menu => {
        this.tabs.push({ name: menu.name });
      });

      for (var i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].name.toLowerCase() === detail.toLowerCase()) {
          this.scrollTab.go2Tab(i);
        }
      }
    }
  }

  tabChange(data: any) {
    this.selectedTab = data.selectedTab;
    this.content.scrollToTop();
  }

  swipeEvent($e) {
    console.log('before', $e.direction);
    switch ($e.direction) {
      case 2: // left
        this.scrollTab.nextTab();
        break;
      case 4: // right
        this.scrollTab.prevTab();
        break;
    }
  }

  filterModal() {
    let modal = this.modalCtrl.create('FilterModalPage', { products: this.products });
    modal.onDidDismiss(data => {
      if (data) {
        console.log(data);
        this.products = data.products;
      }
    });
    modal.present();
  }

  toProduct(prod: Product) {
    this.navCtrl.push('ProductPage', { product: prod });
  }
}
