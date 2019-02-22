import { Component, Prop, Element } from '@stencil/core';
import { ISelectColorOption } from './t-select-color-interface';

@Component({
  tag: 't-select-color-modal',
  styleUrl: 't-select-color-modal.css'
})
export class TSelectColorModal {
  @Prop() handleChange: (selectedOption: ISelectColorOption) => void;

  @Prop() value: string | string[];

  @Prop() modalTitle: string;

  @Prop() modalName: string;

  @Prop() modalObservation: string;

  @Prop() options: ISelectColorOption[];

  @Element() el: any;

  async fecharModal() {
    (this.el.closest('ion-modal') as any).dismiss();
  }

  handleSelectOptionChange(option: ISelectColorOption) {
    this.handleChange(option);

    this.fecharModal();
  }

  renderList() {
    return (
      <ion-grid>
        <ion-row>
          {this.options.map(o =>
            <ion-col size-xs="6" size-sm="3">
              <ion-card style={{ 'background-color': o.hexa }} onClick={() => this.handleSelectOptionChange(o)}>
                <ion-card-content text-center>
                  <ion-card-title color={o.hexa <= '#D2212D' ? 'light' : null}>{o.text}</ion-card-title>
                </ion-card-content>
              </ion-card>
            </ion-col>)}
        </ion-row>
      </ion-grid>
    );
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color='primary'>
          <ion-buttons slot="start">
            <ion-button onClick={() => this.fecharModal()}>
              <ion-icon name="close"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title>{this.modalTitle}</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <div class="name" padding-start padding-top>{this.modalName}</div>
        {this.renderList()}
        <div text-center text-wrap padding-bottom>{this.modalObservation}</div>
      </ion-content>
    ]
  }
}
