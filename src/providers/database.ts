import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

export class Category {
  id: string;
  name: string;
  parent?: string;
  children?: Category[];
  parentShow?: boolean = false;
}

export class Product {
  id: string;
  name: string;
  price: number;
  discount: number = 0;
  image: string;
  colors: string[];
  sizes: string[];
  descriptions: string[];
  categories: Category[];
  brand?: string;
  love?: boolean = false;
  status?: string;

  constructor() {
    this.categories = new Array<Category>();
    this.colors = new Array<string>();
    this.sizes = new Array<string>();
    this.descriptions = new Array<string>();
  }
}

export class Address {
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export interface WishProduct {
  product: Product;
  color?: string;
  size?: string;
}

export interface CartProduct extends WishProduct {
  quantity: number;
}

export class Order {
  id: string;
  date: Date;
  status: string;
}

@Injectable()
export class Cart {
  products: Array<CartProduct>;
  deliveryType: string;
  delivery: number;
  promotion: number = 0;
  private static instance: Cart = null;
  static isCreating: boolean = false;

  // Singleton
  constructor() {
    if (!Cart.isCreating) {
      throw new Error(`You can't call new in Singleton instance!`)
    } else {
      this.products = new Array<CartProduct>();
      this.initialize();
    }
  }

  private initialize() {
    let db = Database.getInstance();
    let products = db.allProduct();

    this.products.push({ product: products[0], quantity: 2, color: 'Green', size: 'M' })
    this.products.push({ product: products[1], quantity: 1, color: 'Pink', size: 'L' })
  }

  static getInstance() {
    console.log('Cart Provider');
    if (Cart.instance === null) {
      Cart.isCreating = true;
      Cart.instance = new Cart();
      Cart.isCreating = false;
    }
    return Cart.instance;
  }

  clear() {
    this.products = new Array<CartProduct>();
    this.deliveryType = ''
    this.delivery = 0;
    this.promotion = 0;
  }

  count(): number {
    let sum: number = 0;
    this.products.forEach(product => {
      sum = parseInt(sum.toString()) + parseInt(product.quantity.toString());
    });
    return sum;
  }

  total(): number {
    let sum: number = 0;
    this.products.forEach(item => {
      sum = parseInt(sum.toString()) + (parseInt(item.quantity.toString()) * (item.product.price - item.product.discount));
    });

    return sum;
  }

  promoTotal(): number {
    let sum: number = 0;
    this.products.forEach(item => {
      sum = parseInt(sum.toString()) + (parseInt(item.quantity.toString()) * (item.product.price - item.product.discount));
    });
    sum = parseInt(sum.toString()) - parseInt(this.promotion.toString());
    return sum;
  }
}
/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Database {
  categories: Category[];
  products: Product[];
  addresses: Address[];
  wishproducts: WishProduct[];
  orders: Order[];
  filterTypes: any[];

  cities: string[];
  states: string[];
  countries: string[];
  zipcodes: string[];
  private static instance: Database = null;
  static isCreating: boolean = false;

  // Singleton
  constructor() {
    if (!Database.isCreating) {
      throw new Error(`You can't call new in Singleton instance!`)
    } else {
      this.categories = new Array<Category>();
      this.products = new Array<Product>();
      this.addresses = new Array<Address>();
      this.wishproducts = new Array<WishProduct>();
      this.orders = new Array<Order>();
      this.filterTypes = new Array<any>();

      this.cities = new Array<string>();
      this.states = new Array<string>();
      this.countries = new Array<string>();
      this.zipcodes = new Array<string>();
      this.initialize();
    }
  }

  static getInstance() {
    console.log('Database Provider');
    if (Database.instance === null) {
      Database.isCreating = true;
      Database.instance = new Database();
      Database.isCreating = false;
    }
    return Database.instance;
  }

  private initialize() {
    console.log('Initialize Database');
    this.countries.push('USA');
    this.states = [
      'New York',
      'California',
      'Indiana',
      'Washington',
    ];
    this.cities = [
      'New York',
      'Los Angeles',
      'San Diego',
      'Seattle',
      'Indianapolis',
      'Oakland'
    ];
    this.zipcodes = [
      '100000',
      '200000',
      '300000'
    ];
    this.addresses = [
      {
        firstname: 'Deepak',
        lastname: 'Pokhrel',
        address: '7220 Mccallum Blvd',
        phone: '1-817-744-0286',
        city: this.cities[1],
        state: this.states[1],
        country: this.countries[0],
        zipcode: '100000'
      },
      {
        firstname: 'Deepak',
        lastname: 'Pokhrel',
        address: '925 Buddy Motorway, New Street',
        phone: '817-744-0286',
        city: this.cities[0],
        state: this.states[0],
        country: this.countries[0],
        zipcode: '75252'
      },
    ];
    let now = new Date();
    let day = 24 * 60 * 60 * 1000;
    this.orders = [
      {
        id: 'SC' + (new Date(now.getTime() - 2*day)).getTime().toString(),
        date: new Date(now.getTime() - 2*day),
        status: 'Dispatched'
      },
      {
        id: 'SC' + (new Date(now.getTime() - 3*day)).getTime().toString(),
        date: new Date(now.getTime() - 3*day),
        status: 'On Way'
      },
      {
        id: 'SC' + (new Date(now.getTime() - 15*day)).getTime().toString(),
        date: new Date(now.getTime() - 15*day),
        status: 'Delivered'
      },
    ];
    this.categories = [
     
      {
        id: '0100',
        name: `Chicken`,
        parentShow: false
      },
      {
        id: '0101',
        name: `Local Chicken`,
        parent: '0100'
      },
      {
        id: '0102',
        name: `Hybrid`,
        parent: '0100'
      },
   
      {
        id: '0200',
        name: `Lamb`,
        parentShow: false
      },
      {
        id: '0201',
        name: `80-90 pounds`,
        parent: '0200'
      },
       {
        id: '0202',
        name: `90-100 pounds`,
        parent: '0200'
      },
    
      {
        id: '0300',
        name: `Goats`,
        parentShow: false
      },
      {
        id: '0301',
        name: `Boer Goats`,
        parent: '0300'
      },
      {
        id: '0302',
        name: `Spanish Goats`,
        parent: '0300'
      }
    ];

    this.products = [
      {
        id: '0001',
        name: `Chicken Brand B #1`,
         price: 13,
        discount: 5,
        image: 'assets/img/categories/girl/bag/chicken.mp4',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised`, `Raised using corns`, `Quality guaranted`],
        categories: [this.categories[1]]
      },
      {
        id: '0002',
        name: `Chicken Brand B #2`,
        price: 13,
        discount: 5,
        image: 'assets/img/categories/girl/bag/chicken.mp4',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised`, `Raised using corns`, `Quality guaranted`],
        categories: [this.categories[1]]
      },
      {
        id: '0003',
        name: `Chicken Brand B #3`,
         price: 13,
        discount: 5,
        image: 'assets/img/categories/girl/bag/chicken.mp4',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised`, `Raised using corns`, `Quality guaranted`],
        categories: [this.categories[1]]
      },
      {
        id: '0004',
        name: `Chicken Brand B #4`,
         price: 13,
        discount: 5,
        image: 'assets/img/categories/girl/bag/chicken.mp4',
        colors: [],
        sizes: [],
        descriptions: [''],
        categories: [this.categories[1]]
      },
    
      {
        id: '0011',
        name: `Chicken Brand A #1`,
        price: 13,
        discount: 5,
        image: 'assets/img/categories/girl/bag/chicken.mp4',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised Chicken`, `Fresh Cut`, `Delicious meat`],
        categories: [this.categories[2]]
      },
       {
        id: '0011',
        name: `Chicken Brand A #2`,
        price: 13,
        discount: 5,
        image: 'assets/img/categories/girl/bag/chicken.mp4',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised Chicken`, `Fresh Cut`, `Delicious meat`],
        categories: [this.categories[2]]
      },
      {
        id: '0011',
        name: `Chicken Brand A #1`,
        price: 13,
        discount: 5,
        image: 'assets/img/categories/girl/bag/chicken.mp4',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised Chicken`, `Fresh Cut`, `Delicious meat`],
        categories: [this.categories[2]]
      },
       {
        id: '0011',
        name: `Chicken Brand A #2`,
        price: 13,
        discount: 5,
        image: 'assets/img/categories/girl/bag/chicken.mp4',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised Chicken`, `Fresh Cut`, `Delicious meat`],
        categories: [this.categories[2]]
      },

      //Goat
      {
        id: '0077',
        name: `Goat Brand #1`,
        price: 200,
        discount: 15,
        image: 'assets/img/categories/kid/girl/girl01.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised`, `Raised using corns`, `Quality guaranted`],
        categories: [this.categories[7]]
      },
       {
        id: '0078', 
        name: `Goat Brand #2`,
        price: 200,
        discount: 15,
        image: 'assets/img/categories/kid/girl/girl01.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised`, `Raised using corns`, `Quality guaranted`],
        categories: [this.categories[7]]
      },
      {
        id: '0077',
        name: `Goat Brand #1`,
        price: 200,
        discount: 15,
        image: 'assets/img/categories/kid/girl/girl01.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised`, `Raised using corns`, `Quality guaranted`],
        categories: [this.categories[7]]
      },
       {
        id: '0078', 
        name: `Goat Brand #2`,
        price: 200,
        discount: 15,
        image: 'assets/img/categories/kid/girl/girl01.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised`, `Raised using corns`, `Quality guaranted`],
        categories: [this.categories[7]]
      },
       {
        id: '0079',
        name: `Goat Brand #3`,
        price: 200,
        discount: 15,
        image: 'assets/img/categories/kid/girl/girl01.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised`, `Raised using corns`, `Quality guaranted`],
        categories: [this.categories[8]]
      },
       {
        id: '0080',
        name: `Goat Brand #4`,
        price: 200,
        discount: 15,
        image: 'assets/img/categories/kid/girl/girl01.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised`, `Raised using corns`, `Quality guaranted`],
        categories: [this.categories[8]]
      },
     
    
      {
        id: '0081',
        name: `Goat Brand B #1`,
        price: 185,
        discount: 5,
        image: 'assets/img/categories/kid/boy/boy01.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised`, `Raised using corns`, `Quality guaranted`],
        categories: [this.categories[8]]
      },
      {
        id: '0082',
        name: `Goat Brand B #2`,
        price: 185,
        discount: 5,
        image: 'assets/img/categories/kid/boy/boy01.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised`, `Raised using corns`, `Quality guaranted`],
        categories: [this.categories[8]]
      },
      {
        id: '0083',
        name: `Goat Brand B #2`,
        price: 185,
        discount: 5,
        image: 'assets/img/categories/kid/boy/boy01.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised`, `Raised using corns`, `Quality guaranted`],
        categories: [this.categories[8]]
      },
      {
        id: '0084',
        name: `Goat Brand B #2`,
        price: 185,
        discount: 5,
        image: 'assets/img/categories/kid/boy/boy01.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised`, `Raised using corns`, `Quality guaranted`],
        categories: [this.categories[8]]
      },

      //lamb
      {
        id: '0001',
        name: `Lamb Brand A #1`,
        price: 210,
        discount: 5,
        image: 'assets/img/categories/man/lamb-main.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised`, `Raised using corns`, `Quality guaranted`],
        categories: [this.categories[3]]
      },
      {
        id: '0002',
        name: `Lamb Brand A #2`,
        price: 210,
        discount: 5,
         image: 'assets/img/categories/man/lamb-main.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised`, `Raised using corns`, `Quality guaranted`],
        categories: [this.categories[4]]
      },
      {
        id: '0003',
        name: `lamb Brand B #1`,
        price: 210,
        discount: 5,
         image: 'assets/img/categories/man/lamb-main.jpg',
       colors: [],
        sizes: [],
        descriptions: [`Farm Raised`, `Raised using corns`, `Quality guaranted`],
        categories: [this.categories[4]]
      },
      {
        id: '0004',
        name: `Lamb Brand B #2`,
        price: 210,
        discount: 5,
         image: 'assets/img/categories/man/lamb-main.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised Lamb`, `Fresh Cut`, `Delicious meat`],
        categories: [this.categories[5]]
      },
    
      {
        id: '0011',
        name: `Lamb Brand B #3`,
        price: 210,
        discount: 5,
        image: 'assets/img/categories/man/lamb-main.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Farm Raised Lamb`, `Fresh Cut`, `Delicious meat`],
        categories: [this.categories[5]]
      }
     
    ];

    this.filterTypes = [
      {
        name: 'Price',
        selected: true,
        type: 'or',
        filters: [
          {
            title: 'Less than $50',
            attr: 'price',
            compare: 'range',
            min: 1,
            max: 50,
            checked: false
          },
          {
            title: 'From $50 to $150',
            attr: 'price',
            compare: 'range',
            min: 50,
            max: 150,
            checked: false
          },
          {
            title: 'From $150 to $250',
            attr: 'price',
            compare: 'range',
            min: 150,
            max: 250,
            checked: false
          },
          {
            title: 'From $250 to $500',
            attr: 'price',
            compare: 'range',
            min: 250,
            max: 500,
            checked: false
          },
        ]
      },
      {
        name: 'Brand',
        selected: false,
        type: 'and',
        filters: [
          {
            title: 'Zaza',
            attr: 'brand',
            compare: 'equal',
            value: 'Zaza',
            checked: false
          },
          {
            title: 'Mango',
            attr: 'brand',
            compare: 'equal',
            value: 'Mango',
            checked: false
          },
          {
            title: 'PT2000',
            attr: 'brand',
            compare: 'equal',
            value: 'PT2000',
            checked: false
          },
          {
            title: 'Blue Exchange',
            attr: 'brand',
            compare: 'equal',
            value: 'Blue Exchange',
            checked: false
          },
          {
            title: 'Hoang Phuc',
            attr: 'brand',
            compare: 'equal',
            value: 'Hoang Phuc',
            checked: false
          },
        ]
      },
      {
        name: 'Size',
        selected: false,
        type: 'and',
        filters: [
          {
            title: 'Has S Size',
            attr: 'sizes',
            compare: 'equal',
            value: 'S',
            checked: false
          },
          {
            title: 'Has M Size',
            attr: 'sizes',
            compare: 'equal',
            value: 'M',
            checked: false
          },
          {
            title: 'Has L Size',
            attr: 'sizes',
            compare: 'equal',
            value: 'L',
            checked: false
          },
          {
            title: 'Has XL Size',
            attr: 'sizes',
            compare: 'equal',
            value: 'XL',
            checked: false
          },
          {
            title: 'Has XXL Size',
            attr: 'sizes',
            compare: 'equal',
            value: 'XXL',
            checked: false
          },
        ]
      },
      {
        name: 'Color',
        selected: false,
        type: 'and',
        filters: [
          {
            title: 'Has Green Color',
            attr: 'colors',
            compare: 'equal',
            value: 'Green',
            checked: false
          },
          {
            title: 'Has Orange Color',
            attr: 'colors',
            compare: 'equal',
            value: 'Orange',
            checked: false
          },
          {
            title: 'Has Pink Color',
            attr: 'colors',
            compare: 'equal',
            value: 'Pink',
            checked: false
          },
          {
            title: 'Has Blue Color',
            attr: 'colors',
            compare: 'equal',
            value: 'Blue',
            checked: false
          },
          {
            title: 'Has Cyan Color',
            attr: 'colors',
            compare: 'equal',
            value: 'Cyan',
            checked: false
          }
        ]
      },
      {
        name: 'Discount',
        selected: false,
        type: 'or',
        filters: [
          {
            title: 'Discount 10%',
            attr: 'discount',
            compare: 'range',
            min: 1,
            max: 10,
            checked: false
          },
          {
            title: 'Discount 25%',
            attr: 'discount',
            compare: 'range',
            min: 1,
            max: 25,
            checked: false
          },
          {
            title: 'Discount 50%',
            attr: 'discount',
            compare: 'range',
            min: 1,
            max: 50,
            checked: false
          },
          {
            title: 'Discount 90%',
            attr: 'discount',
            compare: 'range',
            min: 1,
            max: 90,
            checked: false
          }
        ]
      }
    ];

    this.wishproducts = [
      {
        product: this.products[0],
        color: 'Green',
        size: 'M'
      },
      {
        product: this.products[1],
        color: 'Pink',
        size: 'L'
      },
      {
        product: this.products[2],
        color: 'Blue',
        size: 'S'
      },
    ]
  }

  allFilters(): any {
    return this.filterTypes;
  }

  allCategory(): Category[] {
    return this.categories;
  }

  allSavedAdddress(): Address[] {
    this.addresses = this.addresses.sort((a, b) => { return a.firstname.charCodeAt(0) - b.firstname.charCodeAt(0) });
    return this.addresses;
  }

  allWishList(): WishProduct[] {
    return this.wishproducts;
  }

  allOrders(): Order[] {
    return this.orders;
  }
  removeWish(wish: WishProduct): void {
    var pos = -1;
    for (var i = 0; i < this.wishproducts.length; i++) {
      if (this.wishproducts[i] === wish) {
        pos = i;
      }
    }
    if (pos >= 0) {
      this.wishproducts.splice(pos, 1);
      wish.product.love = false;
    }
  }
  
  removeProductWish(prod: Product) {
    var pos = -1;
    for (var i = 0; i < this.wishproducts.length; i++) {
      if (this.wishproducts[i].product.id === prod.id) {
        pos = i;
      }
    }
    if (pos >= 0) {
      this.wishproducts.splice(pos, 1);
      prod.love = false;
    }
  }

  addWish(wish: WishProduct): void {
    this.wishproducts.push(wish);
  }

  allCities(): string[] {
    return this.cities;
  }

  allStates(): string[] {
    return this.states;
  }
  
  allCountries(): string[] {
    return this.countries;
  }

  allZipCodes(): string [] {
    return this.zipcodes;
  }

  removeSavedAddress(addr: Address): void {
    var pos = -1;
    for (var i = 0; i < this.addresses.length; i++) {
      if (this.addresses[i] === addr) {
        pos = i;
      }
    }
    if (pos >= 0) {
      this.addresses.splice(pos, 1);
    }
  }

  addSavedAddress(addr: Address): void {
    this.addresses.push(addr);
    this.addresses = this.addresses.sort((a, b) => { return a.firstname.charCodeAt(0) - b.firstname.charCodeAt(0) });
  }

  addOrder(order: Order) {
    this.orders.push(order);

    this.orders = this.orders.sort((a, b) => { return b.date.getTime() - a.date.getTime() });
  }

  parentCategory(): Category[] {
    var parents = this.categories.filter(item => {
      return item.parent === undefined;
    });

    parents.forEach(parent => {
      parent.children = new Array<Category>();
      this.categories.forEach(item => {
        if (item.parent === parent.id) {
          parent.children.push(item);
        }
      });
    });
    return parents;
  }

  allProduct(): Product[] {
    return this.products;
  }

  categoryProducts(category: Category): Product[] {
    return this.products;
  }
}
