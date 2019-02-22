import { NavComponent, ComponentProps } from "@ionic/core";

class RouterService {
  async  getNav(source?: HTMLElement): Promise<HTMLIonNavElement> {
    let nav: HTMLIonNavElement

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

  async goBack<T extends NavComponent>(defaultComponent: T, defaultComponentProperties?: ComponentProps<T> | null | undefined, sourceElement?: HTMLElement) {
    const nav = await this.getNav(sourceElement);

    if (await nav.canGoBack()) {
      return await nav.pop();
    } else {
      return await nav.setRoot(defaultComponent, defaultComponentProperties);
    }
  }

  async  goTo<T extends NavComponent>(defaultComponent: T, defaultComponentProperties?: ComponentProps<T> | null | undefined, sourceElement?: HTMLElement) {
    const nav = await this.getNav(sourceElement);
    return await nav.push(defaultComponent, defaultComponentProperties)
  }

  async setRoot<T extends NavComponent>(defaultComponent: T, defaultComponentProperties?: ComponentProps<T> | null | undefined, sourceElement?: HTMLElement) {
    const nav = await this.getNav(sourceElement);
    return await nav.setRoot(defaultComponent, defaultComponentProperties)
  }
}

export default new RouterService();
