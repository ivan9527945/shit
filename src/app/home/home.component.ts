import { Component, OnInit } from '@angular/core';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  url: string = 'https://stackoverflow.com/questions/38037760/how-to-set-iframe-src-without-causing-unsafe-value-exception'
  urlSafe: SafeResourceUrl;

  constructor(
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
