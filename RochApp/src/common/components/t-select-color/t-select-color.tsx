import { Component, Prop, Event, EventEmitter, State, Element} from '@stencil/core';
import { ISelectColorOption } from './t-select-color-interface';

@Component({
  tag: 't-select-color',
  styleUrl: 't-select-color.scss'
})
export class TSelectColor {

  @Prop() name: string;
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() readonly: boolean = false;
  @Prop() options: ISelectColorOption[];
  @Prop() modalTitle: string;
  @Prop() modalName: string;
  @Prop() modalObservation: string;
  @Prop({ mutable: true }) value: string;

  @Event() ionStyle!: EventEmitter;

  @State() text;

  @Event() change: EventEmitter;

  @Prop({ connect: 'ion-modal-controller' }) modalController: HTMLIonModalControllerElement;

  @Element() host: HTMLElement;

  componentWillLoad() {
    this.emitStyle();
  }

  componentDidLoad() {
    this.host.addEventListener('click', e => this.handleClick(e));
  }

  handleClick(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    if (!this.disabled && !this.readonly)
      this.presentModal();
  }

  async presentModal() {
    const modalElement = await this.modalController.create({
      component: 't-select-color-modal',
      componentProps: {
        value: this.value,
        options: this.options,
        modalTitle: this.modalTitle,
        modalName: this.modalName,
        modalObservation: this.modalObservation,
        handleChange: this.handleChange.bind(this)
      }
    });

    modalElement.present();
  }

  handleChange(option: ISelectColorOption) {
    if (!option) {
      this.text = '';
      this.value = null;
    }
    else {
      this.text = option.text;
      this.value = option.value;
    }

    this.change.emit();
    this.emitStyle();
  }

  hasValue() {
    return this.value !== '' && this.value !== null && this.value !== undefined;
  }

  emitStyle() {
    this.ionStyle.emit({
      'interactive': true,
      'interactive-disabled': this.disabled,
      'select': true,
      'has-value': this.hasValue(),
      'has-focus': false
    });
  }

  render() {
    return [
      <div class="t-text">
        {this.text}
      </div>,
      <input
        type="text"
        name={this.name}
        required={this.required}
        value={this.value}
         />
    ];
  }

}
