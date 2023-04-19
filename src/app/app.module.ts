// Angular
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Prizm UI
import {
  PrizmButtonModule,
  PrizmNavigationModule,
  PrizmInputTextModule,
  PrizmWidgetModule
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
    PrizmWidgetModule,
    PrizmThemeModule,
    PrizmButtonModule,
    PrizmNavigationModule,
    PrizmInputTextModule,
    PrizmIconsSvgModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
