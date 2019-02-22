import { Component, Prop, Listen } from "@stencil/core";

@Component({
  tag: "app-root",
  styleUrl: "app-root.scss"
})
export class AppRoot {

  @Prop({ connect: "ion-toast-controller" }) toastCtrl: HTMLIonToastControllerElement;

  @Listen("window:swUpdate")
  async onSWUpdate() {
    const toast = await this.toastCtrl.create({
      message: "New version available",
      showCloseButton: true,
      closeButtonText: "Reload"
    });
    await toast.present();
    await toast.onWillDismiss()
    window.location.reload();
  }

  componentDidLoad() {
    window.requestAnimationFrame(() => {
      let placeholder = document.querySelector('.t-initital-placeholder');
      placeholder && placeholder.remove();
    });
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={true}>

          <ion-route url="/product/insert" component="product-insert-edit"></ion-route>,
          <ion-route url="/product/edit/:productId" component="product-insert-edit"></ion-route>,
          <ion-route url="/product/list" component="product-list"></ion-route>

        </ion-router>

        <menu-page></menu-page>
        <ion-loading-controller></ion-loading-controller>
        {
          // Fix bundle of modal components on Stencil 1.0.0-beta.17
          (window['Force bundle']) ?
            <div>
              <t-combobox-modal-list></t-combobox-modal-list>
              <ion-searchbar></ion-searchbar>
              <ion-buttons></ion-buttons>
              <ion-button></ion-button>
              <ion-toolbar></ion-toolbar>
              <ion-header></ion-header>
              <ion-content></ion-content>
              <ion-list></ion-list>
              <ion-virtual-scroll></ion-virtual-scroll>
              <ion-item></ion-item>
              <ion-label></ion-label>
              <ion-radio></ion-radio>
              <ion-checkbox></ion-checkbox>
              <ion-radio-group></ion-radio-group>
              <ion-icon></ion-icon>
            </div> : null
        }
      </ion-app>
    );
  }
}

