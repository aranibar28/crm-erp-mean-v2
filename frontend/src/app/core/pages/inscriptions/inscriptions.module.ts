import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { ContractInscriptionComponent } from './contract-inscription/contract-inscription.component';
import { CreateInscriptionComponent } from './create-inscription/create-inscription.component';
import { DetailsInscriptionComponent } from './details-inscription/details-inscription.component';
import { IndexInscriptionComponent } from './index-inscription/index-inscription.component';
import { PaymentInscriptionComponent } from './payment-inscription/payment-inscription.component';
import { SurveyInscriptionComponent } from './survey-inscription/survey-inscription.component';

@NgModule({
  declarations: [
    ContractInscriptionComponent,
    CreateInscriptionComponent,
    DetailsInscriptionComponent,
    IndexInscriptionComponent,
    PaymentInscriptionComponent,
    SurveyInscriptionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    InscriptionsRoutingModule,
  ],
})
export class InscriptionsModule {}
