var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, State, Listen } from '@stencil/core';
import productService from './product-service';
let ProductList = class ProductList {
    ionViewWillEnter() {
        this.load();
    }
    async load() {
        this.state = await productService.list();
    }
    async delete(e, id) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        if (confirm('Do you want to delete?')) {
            await productService.delete({ id });
            await this.load();
        }
    }
    insert() {
        const nav = document.querySelector('ion-nav');
        nav.push('product-insert-edit');
    }
    renderProduct(a) {
        return (h("ion-item", { href: `/product/edit/${a.id}` },
            h("ion-label", null, a.descricao),
            h("ion-button", { slot: "end", fill: "clear", onClick: e => this.delete(e, a.id) },
                h("ion-icon", { color: "danger", name: "trash" }))));
    }
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", { color: "primary" },
                    h("ion-buttons", { slot: "start" },
                        h("ion-menu-toggle", null,
                            h("ion-button", null,
                                h("ion-icon", { slot: "icon-only", name: "menu" })))),
                    h("ion-title", null, "Products"))),
            h("ion-content", null,
                h("t-container", null,
                    h("ion-list", { lines: "full", "data-list": true, "data-list-hover": true }, this.state
                        ? this.state.products && this.state.products.length
                            ? this.state.products.map(a => this.renderProduct(a))
                            : h("p", null,
                                h("center", null, "No items found"))
                        : h("p", null,
                            h("center", null,
                                h("ion-spinner", { name: "dots" }))))),
                h("ion-fab", { horizontal: "end", vertical: "bottom", slot: "fixed" },
                    h("ion-fab-button", { onClick: this.insert.bind(this) },
                        h("ion-icon", { name: "add" }))))
        ];
    }
};
__decorate([
    State()
], ProductList.prototype, "state", void 0);
__decorate([
    Listen('ionViewWillEnter')
], ProductList.prototype, "ionViewWillEnter", null);
ProductList = __decorate([
    Component({
        tag: 'product-list'
    })
], ProductList);
export { ProductList };
