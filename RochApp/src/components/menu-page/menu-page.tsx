import { Component } from '@stencil/core';
import { getEnvironment } from '../../common/base/env-factory';

@Component({
  tag: 'menu-page',
  styleUrl: 'menu-page.scss'
})
export class MenuPage {
  env = getEnvironment();

  render() {
    return [
      <ion-split-pane>
        <ion-menu>
          <ion-header>
            <ion-toolbar color="primary">
              <ion-title class="title-logo">
                <img class="logo"></img>
              </ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <ion-list lines="none">
              <ion-menu-toggle autoHide={false}>
                <ion-item href="#/product/list" class="menu-item" routerDirection="root">
                  <ion-icon name="pricetag" slot="start"></ion-icon> Products
                </ion-item>
              </ion-menu-toggle>
            </ion-list>
          </ion-content>
        </ion-menu>
        <ion-nav main></ion-nav>
      </ion-split-pane>
    ];
  }

}
