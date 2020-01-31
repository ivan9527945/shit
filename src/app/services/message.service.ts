import { Injectable, Injector, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalService, ModalConfig } from './modal.service';
import { AlertComponent } from 'src/app/shared/component/alert/alert.component';
import { ConfirmComponent } from 'src/app/shared/component/confirm/confirm.component';
import { NotifierComponent } from 'src/app/shared/component/notifier/notifier.component';


declare var require: any;
declare var layui: any;

// https://github.com/csilva2810/notifier

export interface IConfirmType {
  title?: string;
  msg: string;
  yesFunc: () => void | Promise<void>;
  noFunc?: () => void | Promise<void>;
}

export interface IDynamicModalSetting {
  title: string;
  skin?: string;
  btnAlign?: 'r' | 'l' | 'c';
  closeBtnType?: 0 | 1 | 2;
  area: {
    width: string,
    height?: string
  };
  component: Type<IDynamicComponent>;
  yesBtnName?: string;
  noBtnName?: string;
  afterCreatedFunc?: (component: object) => void;
}

export interface IDynamicComponent {
  closeModal?: () => void;
  yesBtn(): boolean | Promise<boolean>;
  noBtn(): void | Promise<void>;
  cancelBtn?(): boolean | Promise<boolean>;
}

interface AlertOptions {
  title: string;
  text: string;
  textAsHtml?: boolean; // 將 text 以 html 進行 render
  btnCloseTitle?: string; // 關閉按鈕的文字
  onClose?: () => any;
}

const alertOptionsDefault: AlertOptions = {
  title: '温馨提示',
  text: '',
  textAsHtml: false,
  btnCloseTitle: '关闭',
  onClose: () => {}
};

interface ConfirmOptions {
  title: string;
  text: string;
  textAsHtml?: boolean; // 將 text 以 html 進行 render
  btnCloseTitle?: string; // 關閉按鈕的文字
  btnConfirmTitle?: string; // 確定按鈕的文字
  onNo?: () => any;
  onYes?: () => any;
}

const confirmOptionsDefault: ConfirmOptions = {
  title: '温馨提示',
  text: '',
  textAsHtml: false,
  btnCloseTitle: '关闭',
  btnConfirmTitle: '确定',
  onYes: () => {},
  onNo: () => {},
};

interface PromptOptions {
  title: string;
  btnSubmitTitle?: string; // 提交按鈕的文字
  onSubmit: (value: string) => any;
  onCancel: () => any;
}

const promptOptionsDefault: PromptOptions = {
  title: '你今天过得好吗?',
  btnSubmitTitle: '提交',
  onSubmit: (v: string) => {},
  onCancel: () => {},
};

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // toastElement: ons.OnsToastElement;
  toastContent: string;
  toastTimeoutSubject = new Subject();  // 控制關閉

  // notify
  // notifierComp: Subject<NotifierComponent> = new Subject();
  notifierComp: NotifierComponent;

  addDynamicModal$ = new Subject<IDynamicModalSetting>();
  removeDynamicModel$ = new Subject<{ elemId: string }>();

  // toastBusy: boolean;
  // toastQueue: Array<object>;
  // toastMemory: object;
  // toastFrzen: number;

  constructor(
    private injector: Injector,
    private modalSer: ModalService,
  ) {
    console.log('message service init.');
    // this.notifierComp.subscribe(comp => {
    //   setTimeout(comp)
    // });
    // this.initToast();
  }

  // initToast() {
  //   this.toastMemory = {};
  //   this.toastBusy = false;
  //   this.toastQueue = [];
  //   this.toastFrzen = 0;

  //   this.toastTimeoutSubject.subscribe(option => {
  //     let hide_delay = 1500;
  //     if (option.hasOwnProperty('hideDelay') && (typeof option['hideDelay'] === 'number') && option['hideDelay'] >= 1000) {
  //       hide_delay = option['hideDelay'];
  //     }
  //     setTimeout(() => {
  //       // this.toastElement.hide(option);
  //       this.toastBusy = false;
  //       this.toastFrzen = Date.now() + 500; // set delay for hidding animate
  //     }, hide_delay);
  //   });

  //   const self = this;
  //   setInterval(() => { self.tick(); }, 30);
  // }

  async notify(text: string) {
    if (this.notifierComp) {
      this.notifierComp.modalOverlayRef.close();
    }
    // const alertOpts = {...alertOptionsDefault, ...options};
    const comp = this.modalSer.open(NotifierComponent,
      { hasBackdrop: false },
      c => {
        c.text = text;
      }
    );
    this.notifierComp = comp;
    setTimeout(() => {
      comp.modalOverlayRef.close();
    }, 2000);
    // this.notifierComp.next(comp);
  }

  alert(options: AlertOptions) {
    const alertOpts = {...alertOptionsDefault, ...options};
    this.modalSer.open(AlertComponent, {} , c => {
      c.title = alertOpts.title;
      c.text = alertOpts.text;
      c.textAsHtml = alertOpts.textAsHtml;
      c.btnCloseTitle = alertOpts.btnCloseTitle;
      c.onClose = alertOpts.onClose;
    });
  }

  confirm(options: ConfirmOptions,
          modalConfig: ModalConfig = {
            width: 300, maxHeight: 500
          }
  ) {
    const confirmOpts = {...confirmOptionsDefault, ...options};
    this.modalSer.open(ConfirmComponent, modalConfig , c => {
      c.title = confirmOpts.title;
      c.text = confirmOpts.text;
      c.textAsHtml = confirmOpts.textAsHtml;
      c.btnCloseTitle = confirmOpts.btnCloseTitle;
      c.btnConfirmTitle = confirmOpts.btnConfirmTitle;
      c.onYes = confirmOpts.onYes;
      c.onNo = confirmOpts.onNo;
    });
  }

}
