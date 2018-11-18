import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Database, Cart, Category } from '../providers/database';


export interface PageInterface {
  title: string;
  name: string;
  icon?: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  detail?: string;
}

@Component({
  templateUrl: 'app.html'
})
export class Ecom9App {
  @ViewChild(Nav) nav: Nav;
  database: Database;
  cart: Cart;
  menuItems: Category[];
  // make HelloIonicPage the root (or first) page
  rootPage: string;
  pages: PageInterface[] = [
    { title: 'Track Orders', name: 'TabsPage', tabName: 'ProfilePage', index: 4, detail: 'my orders' },
    { title: 'Account details', name: 'TabsPage', tabName: 'ProfilePage', index: 4, detail: 'profile' },
    { title: 'Sign out', name: 'SigninPage', tabName: 'SigninPage', index: 2 },
  ];

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.rootPage = 'SigninPage';
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.database = Database.getInstance();
      this.cart = Cart.getInstance();

      this.menuItems = this.database.parentCategory();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  toggleItems(cat: Category) {
    cat.parentShow = !cat.parentShow;
    this.menuItems.forEach(item => {
      if (item.id !== cat.id) {
        item.parentShow = false;
      }
    })
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    if(page.name === 'SigninPage') {
      this.nav.setRoot(page.name);
    } else {
      this.nav.setRoot(page.name, { tabIndex: page.index, tabName: page.tabName, detail: page.detail });
    }
  }

  categories(menuItem: Category, child: Category) {
    this.menu.close();
    this.nav.setRoot('TabsPage', { tabIndex: 0, parent: menuItem, detail: child.name });
  }
}
