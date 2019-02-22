import { Component, State, Listen } from '@stencil/core';
import productService from './product-service';
import Api from '../../api.typings';

@Component({
  tag: 'product-list'
})
export class ProductList {
  @State() state: Api.Product.List.Dto;

  @Listen('ionViewWillEnter')
  ionViewWillEnter() {
    this.load();
  }

  async load() {
    this.state = await productService.list();
  }

  async delete(e: UIEvent, id: number) {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();

    if (confirm('Do you want to delete?')) {
      await productService.delete({ id });
      await this.load();
    }
  }

  insert() {
    const nav = document.querySelector('ion-nav');
    nav.push('product-insert-edit');
  }

  renderProduct(a: Api.Product.List.ProductDto) {
    return (
      <ion-item href={`/product/edit/${a.id}`}>
        <ion-label>
          {a.descricao}
        </ion-label>
        <ion-button slot="end" fill="clear" onClick={e => this.delete(e, a.id)}>
          <ion-icon color="danger" name="trash"></ion-icon>
        </ion-button>
      </ion-item>
    );
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-menu-toggle>
              <ion-button><ion-icon slot="icon-only" name="menu"></ion-icon></ion-button>
            </ion-menu-toggle>
          </ion-buttons>

          <ion-title>Products</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <t-container>
          <ion-list lines="full" data-list data-list-hover>
            {
              this.state
                ? this.state.products && this.state.products.length
                  ? this.state.products.map(a => this.renderProduct(a))
                  : <p><center>No items found</center></p>
                : <p><center><ion-spinner name="dots"></ion-spinner></center></p>
            }
          </ion-list>
        </t-container>
        <ion-fab horizontal="end" vertical="bottom" slot="fixed">
          <ion-fab-button onClick={this.insert.bind(this)}>
            <ion-icon name="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      </ion-content>
    ];
  }
}
