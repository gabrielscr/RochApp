class RouterService {
    async getNav(source) {
        let nav;
        if (source)
            nav = source.closest('ion-nav');
        else
            nav = document.querySelector('ion-nav');
        if (nav)
            await nav.componentOnReady();
        else
            throw ('IonNav not found');
        return nav;
    }
    async goBack(defaultComponent, defaultComponentProperties, sourceElement) {
        const nav = await this.getNav(sourceElement);
        if (await nav.canGoBack()) {
            return await nav.pop();
        }
        else {
            return await nav.setRoot(defaultComponent, defaultComponentProperties);
        }
    }
    async goTo(defaultComponent, defaultComponentProperties, sourceElement) {
        const nav = await this.getNav(sourceElement);
        return await nav.push(defaultComponent, defaultComponentProperties);
    }
    async setRoot(defaultComponent, defaultComponentProperties, sourceElement) {
        const nav = await this.getNav(sourceElement);
        return await nav.setRoot(defaultComponent, defaultComponentProperties);
    }
}
export default new RouterService();
