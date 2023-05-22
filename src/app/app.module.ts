// Angular
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Prizm UI
import {
  PrizmButtonModule,
  PrizmInputTextModule,
  PrizmWidgetModule,
  PrizmScrollbarModule,
  PrizmNavigationMenuModule,
  PrizmLoaderModule,
  PrizmSkeletonModule,
  PrizmErrorPageModule
} from '@prizm-ui/components';
import { PrizmThemeModule } from '@prizm-ui/theme';
import { PrizmIconsSvgModule } from '@prizm-ui/icons';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { DocumentComponent } from './pages/document/document.component';
import { ErrorComponent } from './pages/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DocumentsComponent,
    DocumentComponent,
    ErrorComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PrizmWidgetModule,
    PrizmScrollbarModule,
    PrizmThemeModule,
    PrizmButtonModule,
    PrizmInputTextModule,
    PrizmIconsSvgModule,
    PrizmNavigationMenuModule,
    PrizmSkeletonModule,
    PrizmLoaderModule,
    PrizmErrorPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
