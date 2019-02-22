var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, Element } from '@stencil/core';
let TSelectColorModal = class TSelectColorModal {
    async fecharModal() {
        this.el.closest('ion-modal').dismiss();
    }
    handleSelectOptionChange(option) {
        this.handleChange(option);
        this.fecharModal();
    }
    renderList() {
        return (h("ion-grid", null,
            h("ion-row", null, this.options.map(o => h("ion-col", { "size-xs": "6", "size-sm": "3" },
                h("ion-card", { style: { 'background-color': o.hexa }, onClick: () => this.handleSelectOptionChange(o) },
                    h("ion-card-content", { "text-center": true },
                        h("ion-card-title", { color: o.hexa <= '#D2212D' ? 'light' : null }, o.text))))))));
    }
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", { color: 'primary' },
                    h("ion-buttons", { slot: "start" },
                        h("ion-button", { onClick: () => this.fecharModal() },
                            h("ion-icon", { name: "close" }))),
                    h("ion-title", null, this.modalTitle))),
            h("ion-content", null,
                h("div", { class: "name", "padding-start": true, "padding-top": true }, this.modalName),
                this.renderList(),
                h("div", { "text-center": true, "text-wrap": true, "padding-bottom": true }, this.modalObservation))
        ];
    }
};
__decorate([
    Prop()
], TSelectColorModal.prototype, "handleChange", void 0);
__decorate([
    Prop()
], TSelectColorModal.prototype, "value", void 0);
__decorate([
    Prop()
], TSelectColorModal.prototype, "modalTitle", void 0);
__decorate([
    Prop()
], TSelectColorModal.prototype, "modalName", void 0);
__decorate([
    Prop()
], TSelectColorModal.prototype, "modalObservation", void 0);
__decorate([
    Prop()
], TSelectColorModal.prototype, "options", void 0);
__decorate([
    Element()
], TSelectColorModal.prototype, "el", void 0);
TSelectColorModal = __decorate([
    Component({
        tag: 't-select-color-modal',
        styleUrl: 't-select-color-modal.css'
    })
], TSelectColorModal);
export { TSelectColorModal };
