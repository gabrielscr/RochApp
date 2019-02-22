var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, Event, State, Element } from '@stencil/core';
let TSelectColor = class TSelectColor {
    constructor() {
        this.disabled = false;
        this.required = false;
        this.readonly = false;
    }
    componentWillLoad() {
        this.emitStyle();
    }
    componentDidLoad() {
        this.host.addEventListener('click', e => this.handleClick(e));
    }
    handleClick(e) {
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
    handleChange(option) {
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
            h("div", { class: "t-text" }, this.text),
            h("input", { type: "text", name: this.name, required: this.required, value: this.value })
        ];
    }
};
__decorate([
    Prop()
], TSelectColor.prototype, "name", void 0);
__decorate([
    Prop()
], TSelectColor.prototype, "disabled", void 0);
__decorate([
    Prop()
], TSelectColor.prototype, "required", void 0);
__decorate([
    Prop()
], TSelectColor.prototype, "readonly", void 0);
__decorate([
    Prop()
], TSelectColor.prototype, "options", void 0);
__decorate([
    Prop()
], TSelectColor.prototype, "modalTitle", void 0);
__decorate([
    Prop()
], TSelectColor.prototype, "modalName", void 0);
__decorate([
    Prop()
], TSelectColor.prototype, "modalObservation", void 0);
__decorate([
    Prop({ mutable: true })
], TSelectColor.prototype, "value", void 0);
__decorate([
    Event()
], TSelectColor.prototype, "ionStyle", void 0);
__decorate([
    State()
], TSelectColor.prototype, "text", void 0);
__decorate([
    Event()
], TSelectColor.prototype, "change", void 0);
__decorate([
    Prop({ connect: 'ion-modal-controller' })
], TSelectColor.prototype, "modalController", void 0);
__decorate([
    Element()
], TSelectColor.prototype, "host", void 0);
TSelectColor = __decorate([
    Component({
        tag: 't-select-color',
        styleUrl: 't-select-color.scss'
    })
], TSelectColor);
export { TSelectColor };
