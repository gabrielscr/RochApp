import { Component, Prop, Element } from '@stencil/core';
import { ISelectImgOption } from './t-select-img-interface';

@Component({
  tag: 't-select-img-modal',
  styleUrl: 't-select-img-modal.css'
})
export class SelectImgModal {
  @Prop() handleChange: (selectedOption: ISelectImgOption) => void;

  @Prop() value: string | string[];

  @Prop() modalTitle: string;

  @Prop() modalName: string;

  @Prop() modalObservation: string;

  @Prop() options: ISelectImgOption[];

  @Element() host: any;

  async fecharModal() {
    (this.host.closest('ion-modal') as any).dismiss();
  }

  handleSelectOptionChange(option: ISelectImgOption) {
    this.handleChange(option);

    this.fecharModal();
  }

  renderList() {
    return (
      <ion-grid>
        <ion-row>
          {this.options.map(o =>
            <ion-col size-xs="6" size-sm="4">
              <ion-card onClick={() => this.handleSelectOptionChange(o)}>
                <ion-img class="img" src={o.src}></ion-img>
                <ion-card-content>
                  <ion-card-title class="img-title">{o.text}</ion-card-title>
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
