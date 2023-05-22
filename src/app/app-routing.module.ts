// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import { DocumentComponent } from './pages/document/document.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  { path: 'documents', component: DocumentsComponent },
  { path: 'documents/:id', component: DocumentComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: "/error?status=404&message=Страница не найдена" },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
