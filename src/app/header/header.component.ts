import { Component } from "@angular/core";
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  testttt() {
    $('.test').hide();
    console.log(123);
  }
}
