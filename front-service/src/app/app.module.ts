import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RouterModule } from '@angular/router';

import { NbThemeModule, NbDialogModule, NbLayoutModule, NbCardModule, NbIconModule, 
         NbInputModule, NbTreeGridModule, NbCheckboxModule, NbToastrModule, NbMenuModule, 
         NbTabsetModule, NbRouteTabsetModule, NbActionsModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { paginationFr } from './software/pagination/paginationfr';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { AboutComponent } from './software/components/about/about.component';
import { FooterComponent } from './template/footer/footer.component';
import { LoginComponent } from './software/components/login/login.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { NavbarUserComponent } from './template/navbar-user/navbar-user.component';

import { ListClientComponent } from './software/components/client/list-client/list-client.component';
import { DetailClientComponent } from './software/components/client/detail-client/detail-client.component';
import { CreateClientComponent } from './software/components/client/create-client/create-client.component';
import { UpdateClientComponent } from './software/components/client/update-client/update-client.component';
import { ListClientFilterPipe } from './software/filters/client-filter';

import { ListPlanningComponent } from './software/components/planning/list-planning/list-planning.component';
import { CreatePlanningComponent } from './software/components/planning/create-planning/create-planning.component';
import { UpdatePlanningComponent } from './software/components/planning/update-planning/update-planning.component';
import { DetailPlanningComponent } from './software/components/planning/detail-planning/detail-planning.component';

import { ListPlanningDeveloperTodoComponent } from './software/components/planning-developer/list-planning-developer-todo/list-planning-developer-todo.component';
import { DetailPlanningDeveloperTodoComponent } from './software/components/planning-developer/detail-planning-developer-todo/detail-planning-developer-todo.component';

import { ListProjectComponent } from './software/components/project/list-project/list-project.component';
import { DetailProjectComponent } from './software/components/project/detail-project/detail-project.component';
import { CreateProjectComponent } from './software/components/project/create-project/create-project.component';
import { UpdateProjectComponent } from './software/components/project/update-project/update-project.component';
import { ListProjectFilterPipe } from './software/filters/project-filter';

import { ListQuoteComponent } from './software/components/quote/list-quote/list-quote.component';
import { DetailQuoteComponent } from './software/components/quote/detail-quote/detail-quote.component';
import { UpdateQuoteComponent } from './software/components/quote/update-quote/update-quote.component';
import { CreateQuoteComponent } from './software/components/quote/create-quote/create-quote.component';
import { ListQuoteFilterPipe } from './software/filters/quote-filter';

import { CreateSpecializationComponent } from './software/components/specialization/create-specialization/create-specialization.component';
import { UpdateSpecializationComponent } from './software/components/specialization/update-specialization/update-specialization.component';
import { ListSpecializationComponent } from './software/components/specialization/list-specialization/list-specialization.component';
import { DetailSpecializationComponent } from './software/components/specialization/detail-specialization/detail-specialization.component';
import { ListSpecializationFilterPipe } from './software/filters/specialization-filter';

import { ListTemplateComponent } from './software/components/template/list-template/list-template.component';
import { DetailTemplateComponent } from './software/components/template/detail-template/detail-template.component';
import { CreateTemplateComponent } from './software/components/template/create-template/create-template.component';
import { UpdateTemplateComponent } from './software/components/template/update-template/update-template.component';
import { ListTemplateFilterPipe } from './software/filters/template-filter';

import { ListTodoComponent } from './software/components/todo/list-todo/list-todo.component';
import { DetailTodoComponent } from './software/components/todo/detail-todo/detail-todo.component';
import { CreateTodoComponent } from './software/components/todo/create-todo/create-todo.component';
import { UpdateTodoComponent } from './software/components/todo/update-todo/update-todo.component';
import { ListTodoFilterPipe } from './software/filters/todo-filter';

import { ListUserComponent } from './software/components/user/list-user/list-user.component';
import { DetailUserComponent } from './software/components/user/detail-user/detail-user.component';
import { CreateUserComponent } from './software/components/user/create-user/create-user.component';
import { UpdateUserComponent } from './software/components/user/update-user/update-user.component';
import { ListUserFilterPipe } from './software/filters/user-filter';

import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeDeveloperComponent } from './software/components/home/home-developer/home-developer.component';
import { HomeAdministratorComponent } from './software/components/home/home-administrator/home-administrator.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent, 

    ListClientComponent,
    DetailClientComponent,
    CreateClientComponent,
    UpdateClientComponent, 
    ListClientFilterPipe,

    ListPlanningComponent,
    CreatePlanningComponent,
    UpdatePlanningComponent,
    DetailPlanningComponent,

    ListProjectComponent,
    DetailProjectComponent,
    CreateProjectComponent,
    UpdateProjectComponent,
    ListProjectFilterPipe,

    ListQuoteComponent,
    DetailQuoteComponent,
    CreateQuoteComponent,
    UpdateQuoteComponent,
    ListQuoteFilterPipe,

    CreateSpecializationComponent,
    UpdateSpecializationComponent,
    ListSpecializationComponent,
    DetailSpecializationComponent,  
    ListSpecializationFilterPipe,

    ListTemplateComponent,
    DetailTemplateComponent,
    CreateTemplateComponent,
    UpdateTemplateComponent,
    ListTemplateFilterPipe,
    
    ListTodoComponent,
    DetailTodoComponent,
    CreateTodoComponent,
    UpdateTodoComponent,
    ListTodoFilterPipe,

    ListUserComponent,
    DetailUserComponent,
    CreateUserComponent,  
    UpdateUserComponent,
    ListUserFilterPipe,

    AboutComponent,
    FooterComponent,
    LoginComponent,
    NavbarComponent,
    NavbarUserComponent,
    ListPlanningDeveloperTodoComponent,
    DetailPlanningDeveloperTodoComponent,
    HomeDeveloperComponent,
    HomeAdministratorComponent,
      
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,

    NbActionsModule,
    NbCardModule,
    NbCheckboxModule,
    NbDialogModule,
    NbEvaIconsModule,
    NbIconModule, 
    NbInputModule, 
    NbLayoutModule,
    NbMenuModule,
    NbRouteTabsetModule,
    NbTabsetModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbToastrModule.forRoot(),
    NbTreeGridModule,

    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,

  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" },
    { provide: MAT_DATE_LOCALE, useValue: 'fr' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MatPaginatorIntl, useClass: paginationFr }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
