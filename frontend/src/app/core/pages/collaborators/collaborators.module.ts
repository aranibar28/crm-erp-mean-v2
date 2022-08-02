import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { CollaboratorsRoutingModule } from './collaborators-routing.module';
import { IndexCollaboratorComponent } from './index-collaborator/index-collaborator.component';
import { CreateCollaboratorComponent } from './create-collaborator/create-collaborator.component';
import { UpdateCollaboratorComponent } from './update-collaborator/update-collaborator.component';

@NgModule({
  declarations: [
    IndexCollaboratorComponent,
    CreateCollaboratorComponent,
    UpdateCollaboratorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CollaboratorsRoutingModule,
  ],
})
export class CollaboratorsModule {}
