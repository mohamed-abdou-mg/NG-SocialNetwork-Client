import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./errors/not-found/not-found.component";
import { ServerErrorComponent } from "./errors/server-error/server-error.component";
import { TestErrorComponent } from "./errors/test-error/test-error.component";
import { HomeComponent } from "./home/home.component";
import { ListsComponent } from "./lists/lists.component";
import { MemberDetailsComponent } from "./members/member-details/member-details.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { AuthGuard } from "./_guards/auth.guard";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "", runGuardsAndResolvers: "always", canActivate: [AuthGuard], children: [
        { path: "members", component: MemberListComponent },
        { path: "members/:id", component: MemberDetailsComponent },
        { path: "lists", component: ListsComponent },
        { path: "messages", component: MessagesComponent },
    ]},
    { path: "errors", component: TestErrorComponent },
    { path: "not-found", component: NotFoundComponent },
    { path: "server-error", component: ServerErrorComponent },
    { path: "**", component: HomeComponent, pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}