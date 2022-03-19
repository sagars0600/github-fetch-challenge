import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UserComponent } from './user/user.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [AppComponent, UserComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PaginatorModule,
    ImageModule,
    CardModule,
    ProgressSpinnerModule,
    InputTextModule,
    ButtonModule,
    HttpClientModule,
    NgxUiLoaderModule,
    ToastModule,
    NgxPaginationModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
