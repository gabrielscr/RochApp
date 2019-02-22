var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, Element } from '@stencil/core';
let SelectImgModal = class SelectImgModal {
    async fecharModal() {
        this.host.closest('ion-modal').dismiss();
    }
    handleSelectOptionChange(option) {
        this.handleChange(option);
        this.fecharModal();
    }
    renderList() {
        return (h("ion-grid", null,
            h("ion-row", null, this.options.map(o => h("ion-col", { "size-xs": "6", "size-sm": "4" },
                h("ion-card", { onClick: () => this.handleSelectOptionChange(o) },
                    h("ion-img", { class: "img", src: o.src }),
                    h("ion-card-content", null,
                        h("ion-card-title", { class: "img-title" }, o.text))))))));
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
], SelectImgModal.prototype, "handleChange", void 0);
__decorate([
    Prop()
], SelectImgModal.prototype, "value", void 0);
__decorate([
    Prop()
], SelectImgModal.prototype, "modalTitle", void 0);
__decorate([
    Prop()
], SelectImgModal.prototype, "modalName", void 0);
__decorate([
    Prop()
], SelectImgModal.prototype, "modalObservation", void 0);
__decorate([
    Prop()
], SelectImgModal.prototype, "options", void 0);
__decorate([
    Element()
], SelectImgModal.prototype, "host", void 0);
SelectImgModal = __decorate([
    Component({
        tag: 't-select-img-modal',
        styleUrl: 't-select-img-modal.css'
    })
], SelectImgModal);
export { SelectImgModal };
