import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCollaboratorComponent } from './create-collaborator/create-collaborator.component';
import { IndexCollaboratorComponent } from './index-collaborator/index-collaborator.component';
import { UpdateCollaboratorComponent } from './update-collaborator/update-collaborator.component';

const routes: Routes = [
  { path: '', component: IndexCollaboratorComponent },
  { path: 'create', component: CreateCollaboratorComponent },
  { path: 'update/:id', component: UpdateCollaboratorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollaboratorsRoutingModule {}
