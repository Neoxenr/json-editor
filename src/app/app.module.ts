// Angular
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule }   from '@angular/common/http';

// Prizm UI
import {
  PrizmButtonModule,
  PrizmInputTextModule,
  PrizmWidgetModule,
  PrizmScrollbarModule,
  PrizmNavigationMenuModule,
} from '@prizm-ui/components';
import { PrizmThemeModule } from '@prizm-ui/theme';
import { PrizmIconsSvgModule } from '@prizm-ui/icons';

// Components
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ContentComponent } from './components/content/content.component';

@NgModule({
  declarations: [AppComponent, NavigationComponent, ContentComponent],
  imports: [
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
