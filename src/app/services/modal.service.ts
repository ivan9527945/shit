import { Injectable, Injector, ComponentRef, Component, Type } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ModalOverlayRef } from './modal/modal-overlay-ref';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { MODAL_CONFIG, MODAL_COMPNENT } from './modal/modal-tokens';

export interface ModalConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  /** 點擊背景關閉視窗 */
  closeOnBackdropClick?: boolean;
  backdropClass?: string;
  /** The width of the overlay panel. If a number is provided, pixel units are assumed. */
  width?: number | string;
  /** The height of the overlay panel. If a number is provided, pixel units are assumed. */
  height?: number | string;
  /** The min-width of the overlay panel. If a number is provided, pixel units are assumed. */
  minWidth?: number | string;
  /** The min-height of the overlay panel. If a number is provided, pixel units are assumed. */
  minHeight?: number | string;
  /** The max-width of the overlay panel. If a number is provided, pixel units are assumed. */
  maxWidth?: number | string;
  /** The max-height of the overlay panel. If a number is provided, pixel units are assumed. */
  maxHeight?: number | string;
  /**
   * Whether the overlay should be disposed of when the user goes backwards/forwards in history.
   * Note that this usually doesn't include clicking on links (unless the user is using
   * the `HashLocationStrategy`).
   */
  disposeOnNavigation?: boolean;
}

const DEFAULT_CONFIG: ModalConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel',
  disposeOnNavigation: true,
  closeOnBackdropClick: false,
};

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(
    private injector: Injector,
    private overlay: Overlay) { }

  open<T>(component: Type<T>, config: ModalConfig, afterCreateFunc?: (component: T) => void) {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // Instantiate remote control
    const modalOverlayRef = new ModalOverlayRef(overlayRef);

    const overlayComponent = this.attachDialogContainer<T>(component, afterCreateFunc, overlayRef, dialogConfig, modalOverlayRef);
    if (config.closeOnBackdropClick) {
      overlayRef.backdropClick().subscribe(_ => {
        modalOverlayRef.close();
        // setTimeout(() => config.onBackdropClick(), 0);
      });
    }

    return overlayComponent;
  }

  private createOverlay(config: ModalConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private attachDialogContainer<T>( component: Type<T>, afterCreateFunc: (componentInstance: T) => void = () => {},
                                    overlayRef: OverlayRef, config: ModalConfig, modalOverlayRef: ModalOverlayRef) {
    const injector = this.createInjector<T>(component, config, modalOverlayRef);

    const containerPortal = new ComponentPortal(component, null, injector);
    const containerRef: ComponentRef<T> = overlayRef.attach(containerPortal);
    afterCreateFunc(containerRef.instance);
    return containerRef.instance;
  }

  private createInjector<T>(component: Type<T>, config: ModalConfig, modalRef: ModalOverlayRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(ModalOverlayRef, modalRef);
    injectionTokens.set(MODAL_CONFIG, config);
    injectionTokens.set(MODAL_COMPNENT, component);

    return new PortalInjector(this.injector, injectionTokens);
  }

  private getOverlayConfig(config: ModalConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
      width: config.width,
      height: config.height,
      minWidth: config.minWidth,
      minHeight: config.minHeight,
      maxWidth: config.maxWidth,
      maxHeight: config.maxHeight,
      disposeOnNavigation: config.disposeOnNavigation
    });

    return overlayConfig;
  }
}
