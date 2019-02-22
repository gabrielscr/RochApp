var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, State, Prop, Element } from '@stencil/core';
import { handleChange } from '../../common/base/handle-change';
import productService from './product-service';
import routerService from '../../common/base/router-service';
let ProductInsertEdit = class ProductInsertEdit {
    handleChange(e) {
        handleChange(e, this, 'state');
    }
    componentWillLoad() {
        this.load();
    }
    async load() {
        if (this.productId)
            this.state = await productService.getToEdit({ id: this.productId });
        else
            this.state = {
                id: await productService.getNextId(),
                descricao: '',
                valor: 0
            };
    }
    async confirm(e) {
        e.preventDefault();
        await this.formController.componentOnReady();
        await this.formController.processSubmit(this.form, async () => {
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
        return (h("form", { ref: form => this.form = form, onSubmit: e => this.confirm(e), novalidate: true },
            h("t-message-summary", null),
            h("ion-list", null,
                h("ion-item", null,
                    h("ion-label", { position: "floating" }, "Id"),
                    h("ion-input", { name: "id", type: "number", disabled: !!this.productId, step: "1", min: "1", required: true, value: this.state.id, onIonChange: e => this.handleChange(e) }),
                    h("t-message", { name: "id" })),
                h("ion-item", null,
                    h("ion-label", { position: "floating" }, "Name"),
                    h("ion-input", { name: "name", required: true, maxlength: 150, value: this.state.descricao, onIonChange: e => this.handleChange(e), autofocus: true }),
                    h("t-message", { name: "name" })),
                h("ion-item", null,
                    h("ion-label", { position: "floating" }, "Order"),
                    h("ion-input", { name: "order", type: "number", step: "1", min: "0", required: true, value: this.state.valor, onIonChange: e => this.handleChange(e) }),
                    h("t-message", { name: "order" })))));
    }
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", { color: "primary" },
                    h("ion-buttons", { slot: "start" },
                        h("ion-back-button", { defaultHref: '/product/list' })),
                    h("ion-title", null,
                        this.productId ? 'Edit' : 'Insert',
                        " Product"),
                    h("ion-buttons", { slot: "end" },
                        h("ion-button", { onClick: e => this.confirm(e), disabled: !this.state }, "Confirmar")))),
            h("ion-content", null,
                h("t-container", null, this.state
                    ? this.renderForm()
                    : h("center", null,
                        h("ion-spinner", { name: "dots" })))),
            h("t-form-controller", { ref: p => this.formController = p })
        ];
    }
};
__decorate([
    Prop()
], ProductInsertEdit.prototype, "productId", void 0);
__decorate([
    State()
], ProductInsertEdit.prototype, "state", void 0);
__decorate([
    Element()
], ProductInsertEdit.prototype, "host", void 0);
ProductInsertEdit = __decorate([
    Component({
        tag: 'product-insert-edit',
        styles: `
  ion-modal product-insert-edit ion-back-button {
    display: none !important;
  }
  `
    })
], ProductInsertEdit);
export { ProductInsertEdit };
