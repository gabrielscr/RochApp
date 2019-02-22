import { Component, State, Prop, Element } from '@stencil/core';
import { handleChange } from '../../common/base/handle-change';
import productService from './product-service';
import Api from '../../api.typings';
import routerService from '../../common/base/router-service';

@Component({
  tag: 'product-insert-edit',
  styles: `
  ion-modal product-insert-edit ion-back-button {
    display: none !important;
  }
  `
})
export class ProductInsertEdit {

  @Prop() productId: number;

  form: HTMLFormElement;

  formController: HTMLTFormControllerElement;

  @State() state: Api.Product.InsertEdit.Command;

  @Element() host: HTMLElement;

  handleChange(e: Event) {
    handleChange(e, this, 'state');
  }

  componentWillLoad() {
    this.load();
  }

  async load() {
    if (this.productId)
      this.state = await productService.getToEdit({ id: this.productId })
    else
      this.state = {
        id: await productService.getNextId(),
        descricao: '',
        valor: 0
      };
  }

  async confirm(e: Event) {
    e.preventDefault();

    await this.formController.componentOnReady();
    await this.formController.processSubmit(
      this.form,
      async () => {
        if (this.state.id)
          await productService.edit(this.state);
        else
          await productService.insert(this.state);

        let modal = this.host.closest('ion-modal');
        if (modal) {
          await modal.dismiss();
          return;
        }

        await routerService.goBack('product-list');
      });
  }

  renderForm() {
    return (
      <form ref={form => this.form = form as any} onSubmit={e => this.confirm(e)} novalidate>

        <t-message-summary></t-message-summary>

        <ion-list>

          <ion-item>
            <ion-label position="floating">Id</ion-label>
            <ion-input name="id" type="number" disabled={!!this.productId} step="1" min="1" required value={this.state.id as any} onIonChange={e => this.handleChange(e)}></ion-input>
            <t-message name="id"></t-message>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Name</ion-label>
            <ion-input name="name" required maxlength={150} value={this.state.descricao} onIonChange={e => this.handleChange(e)} autofocus></ion-input>
            <t-message name="name"></t-message>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Order</ion-label>
            <ion-input name="order" type="number" step="1" min="0" required value={this.state.valor as any} onIonChange={e => this.handleChange(e)}></ion-input>
            <t-message name="order"></t-message>
          </ion-item>

        </ion-list>

      </form>
    );
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref='/product/list'></ion-back-button>
          </ion-buttons>

          <ion-title>{this.productId ? 'Edit' : 'Insert'} Product</ion-title>

          <ion-buttons slot="end">
            <ion-button onClick={e => this.confirm(e)} disabled={!this.state}>
              Confirmar
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <t-container>
          {this.state
            ? this.renderForm()
            : <center><ion-spinner name="dots"></ion-spinner></center>}
        </t-container>
      </ion-content>,

      <t-form-controller ref={p => this.formController = p as any}></t-form-controller>
    ];
  }
}
