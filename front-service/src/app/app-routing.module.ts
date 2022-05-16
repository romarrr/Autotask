import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Components
import { ListClientComponent } from './software/components/client/list-client/list-client.component';
import { DetailClientComponent } from './software/components/client/detail-client/detail-client.component';
import { CreateClientComponent } from './software/components/client/create-client/create-client.component';
import { UpdateClientComponent } from './software/components/client/update-client/update-client.component';

import { ListPlanningComponent } from './software/components/planning/list-planning/list-planning.component';
import { DetailPlanningComponent } from './software/components/planning/detail-planning/detail-planning.component';
import { CreatePlanningComponent } from './software/components/planning/create-planning/create-planning.component';
import { UpdatePlanningComponent } from './software/components/planning/update-planning/update-planning.component';

import { ListPlanningDeveloperTodoComponent } from './software/components/planning-developer/list-planning-developer-todo/list-planning-developer-todo.component';
import { DetailPlanningDeveloperTodoComponent } from './software/components/planning-developer/detail-planning-developer-todo/detail-planning-developer-todo.component';

import { ListProjectComponent } from './software/components/project/list-project/list-project.component';
import { DetailProjectComponent } from './software/components/project/detail-project/detail-project.component';
import { CreateProjectComponent } from './software/components/project/create-project/create-project.component';
import { UpdateProjectComponent } from './software/components/project/update-project/update-project.component';

import { ListQuoteComponent } from './software/components/quote/list-quote/list-quote.component';
import { DetailQuoteComponent } from './software/components/quote/detail-quote/detail-quote.component';
import { CreateQuoteComponent } from './software/components/quote/create-quote/create-quote.component';
import { UpdateQuoteComponent } from './software/components/quote/update-quote/update-quote.component';

import { ListSpecializationComponent } from './software/components/specialization/list-specialization/list-specialization.component';
import { DetailSpecializationComponent } from './software/components/specialization/detail-specialization/detail-specialization.component';
import { CreateSpecializationComponent } from './software/components/specialization/create-specialization/create-specialization.component';
import { UpdateSpecializationComponent } from './software/components/specialization/update-specialization/update-specialization.component';

import { ListTemplateComponent } from './software/components/template/list-template/list-template.component';
import { DetailTemplateComponent } from './software/components/template/detail-template/detail-template.component';
import { CreateTemplateComponent } from './software/components/template/create-template/create-template.component';
import { UpdateTemplateComponent } from './software/components/template/update-template/update-template.component';

import { ListTodoComponent } from './software/components/todo/list-todo/list-todo.component';
import { CreateTodoComponent } from './software/components/todo/create-todo/create-todo.component';
import { DetailTodoComponent } from './software/components/todo/detail-todo/detail-todo.component';
import { UpdateTodoComponent } from './software/components/todo/update-todo/update-todo.component';

import { ListUserComponent } from './software/components/user/list-user/list-user.component';
import { DetailUserComponent } from './software/components/user/detail-user/detail-user.component';
import { CreateUserComponent } from './software/components/user/create-user/create-user.component';
import { UpdateUserComponent } from './software/components/user/update-user/update-user.component';

import { AboutComponent } from './software/components/about/about.component';
import { HomeComponent } from './software/components/home/home.component';
import { LoginComponent } from './software/components/login/login.component';

// Resolvers
import { DetailClientResolver } from './software/resolvers/detail-client.resolver';
import { ListClientResolver } from './software/resolvers/list-client.resolver';

import { HomeResolver } from './software/resolvers/home.resolver';

import { DetailPlanningResolver } from './software/resolvers/detail-planning.resolver';
import { ListPlanningResolver } from './software/resolvers/list-planning.resolver';

import { ListPlanningDeveloperTodoResolver } from './software/resolvers/list-planning-developer-todo.resolver';

import { DetailProjectResolver } from './software/resolvers/detail-project.resolver';
import { ListProjectResolver } from './software/resolvers/list-project.resolver';

import { DetailQuoteResolver } from './software/resolvers/detail-quote.resolver';
import { ListQuoteResolver } from './software/resolvers/list-quote.resolver';

import { ListSkillResolver } from './software/resolvers/list-skill.resolver';

import { DetailSpecializationResolver } from './software/resolvers/detail-specialization.resolver';
import { ListSpecializationResolver } from './software/resolvers/list-specialization.resolver';

import { DetailTemplateResolver } from './software/resolvers/detail-template.resolver';
import { ListTemplateResolver } from './software/resolvers/list-template.resolver';

import { DetailTodoResolver } from './software/resolvers/detail-todo.resolver';
import { ListTodoResolver } from './software/resolvers/list-todo.resolver';

import { DetailUserResolver } from './software/resolvers/detail-user.resolver';
import { ListUserResolver } from './software/resolvers/list-user.resolver';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: "about", component: AboutComponent },

  { path: "client", component: ListClientComponent, resolve: { clients: ListClientResolver } },
  { path: "client/detail/:id", component: DetailClientComponent, resolve: { client: DetailClientResolver } },
  { path: "client/add", component: CreateClientComponent },
  { path: "client/update/:id", component: UpdateClientComponent, resolve: { client: DetailClientResolver } },

  { path: "home", component: HomeComponent, resolve: { home: HomeResolver } },

  { path: "login", component: LoginComponent },

  { path: "planning", component: ListPlanningComponent, resolve: { plannings: ListPlanningResolver } },
  { path: "planning/detail/:id", component: DetailPlanningComponent, resolve: { planning: DetailPlanningResolver } },
  { path: "planning/add", component: CreatePlanningComponent, resolve: { clients: ListClientResolver } },
  { path: "planning/update/:id", component: UpdatePlanningComponent, resolve: { planning: DetailPlanningResolver, clients: ListClientResolver } },

  { path: "planningdeveloper/user/:id/todos", component: ListPlanningDeveloperTodoComponent, resolve: { planningdevelopertodos:   ListPlanningDeveloperTodoResolver, user: DetailUserResolver } },
  { path: "planningdeveloper/user/:id/todo/detail/:id", component: DetailPlanningDeveloperTodoComponent, resolve: { todo: DetailTodoResolver } },
  { path: "planningdeveloper/add", component: CreatePlanningComponent, resolve: { clients: ListClientResolver } },
  { path: "planningdeveloper/update/:id", component: UpdatePlanningComponent, resolve: { planning: DetailPlanningResolver, clients: ListClientResolver } },

  { path: "project", component: ListProjectComponent, resolve: { projects: ListProjectResolver } },
  { path: "project/detail/:id", component: DetailProjectComponent, resolve: { project: DetailProjectResolver } },
  { path: "project/add", component: CreateProjectComponent, resolve: { clients: ListClientResolver } },
  { path: "project/update/:id", component: UpdateProjectComponent, resolve: { project: DetailProjectResolver, clients: ListClientResolver } },

  { path: "quote", component: ListQuoteComponent, resolve: { quotes: ListQuoteResolver } },
  { path: "quote/detail/:id", component: DetailQuoteComponent, resolve: { quote: DetailQuoteResolver, client: DetailClientResolver, template: DetailTemplateResolver, Todos: ListTodoResolver } },
  { path: "quote/add", component: CreateQuoteComponent, resolve: { clients: ListClientResolver, templates: ListTemplateResolver, todos: ListTodoResolver } },
  { path: "quote/update/:id", component: UpdateQuoteComponent, resolve: { clients: ListClientResolver, quote: DetailQuoteResolver, templates: ListTemplateResolver, todos: ListTodoResolver  } },

  { path: "specialization", component: ListSpecializationComponent, resolve: { specializations: ListSpecializationResolver }  },
  { path: "specialization/detail/:id", component: DetailSpecializationComponent, resolve: { specialization: DetailSpecializationResolver } },
  { path: "specialization/add", component: CreateSpecializationComponent, resolve: { todos: ListTodoResolver } },
  { path: "specialization/update/:id", component: UpdateSpecializationComponent, resolve: { specialization: DetailSpecializationResolver } },

  { path: "template", component: ListTemplateComponent, resolve: { templates: ListTemplateResolver }  },
  { path: "template/detail/:id", component: DetailTemplateComponent, resolve: { template: DetailTemplateResolver } },
  { path: "template/add", component: CreateTemplateComponent, resolve: { todos: ListTodoResolver } },
  { path: "template/update/:id", component: UpdateTemplateComponent, resolve: { template: DetailTemplateResolver } },

  { path: "todo", component: ListTodoComponent, resolve: { todos: ListTodoResolver } },
  { path: "todo/detail/:id", component: DetailTodoComponent, resolve: { todo: DetailTodoResolver } },
  { path: "todo/add", component: CreateTodoComponent, resolve: { skills: ListSkillResolver } },
  { path: "todo/update/:id", component: UpdateTodoComponent, resolve: { todo: DetailTodoResolver, skills: ListSkillResolver } },

  { path: "user", component: ListUserComponent, resolve: { users: ListUserResolver } },
  { path: "user/detail/:id", component: DetailUserComponent, resolve: { user: DetailUserResolver } },
  { path: "user/add", component: CreateUserComponent, resolve: { specializations: ListSpecializationResolver, skills: ListSkillResolver } },
  { path: "user/update/:id", component: UpdateUserComponent, resolve: { user: DetailUserResolver, skills: ListSkillResolver } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
  providers: [
    HomeResolver,

    ListClientResolver, 
    DetailClientResolver,

    ListPlanningResolver,
    DetailPlanningResolver,

    ListPlanningDeveloperTodoResolver,

    ListProjectResolver,
    DetailProjectResolver,

    ListQuoteResolver,
    DetailQuoteResolver, 

    ListSpecializationResolver,
    DetailSpecializationResolver,

    ListSkillResolver,

    ListTemplateResolver,
    DetailTemplateResolver,
    
    ListTodoResolver,
    DetailTodoResolver,

    ListUserResolver,
    DetailUserResolver,
    
  ]
})
export class AppRoutingModule { }
