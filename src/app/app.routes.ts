import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';


import { AddSalesTransactionComponent } from './sales/add-sales-transaction/add-sales-transaction.component';
import { ListSaleComponent } from './sales/list-sale/list-sale.component';

import { HomeComponent } from './home/home.component';
import { AddProdComponent } from './Produit/add-prod/add-prod.component';
import { ConditionComponent } from './condition/condition.component';
import { DashbordAdminComponent } from './dashbord-admin/dashbord-admin.component';
import { authGuard } from './auth.guard';
import { ListProdComponent } from './Produit/list-prod/list-prod.component';
import { EditProduitComponent } from './Produit/edit-produit/edit-produit.component';
import { AddRegionComponent } from './region/add-region/add-region.component';
import { AgenceComponent } from './agence/agence.component';
import { ScoreRuleComponent } from './score/score-rule/score-rule.component';
import { AddChallengeeComponent } from './challengee/add-challengee/add-challengee.component';
import { ComposantComponent } from './challengee/composant/composant.component';
import { ListeChaComponent } from './challengee/liste-cha/liste-cha.component';
import { ViewComponent } from './challengee/view/view.component';
import { RankingComponent } from './ranking/ranking.component';
import { EditComponent } from './challengee/edit/edit.component';
import { ListParticipationComponent } from './Participation/list-participation/list-participation.component';
import { ParticipantComponent } from './Participe/participant/participant.component';
import { ListeParticipantComponent } from './Participe/liste-participant/liste-participant.component';
import { EditParComponent } from './Participe/edit-par/edit-par.component';
import { GainComponent } from './gain/gain.component';
import { AdminNotificationComponent } from './notification/admin-notification/admin-notification.component';
import { AddChallengeStepperComponent } from './add-challenge-stepper/add-challenge-stepper.component';
import { DashbordUserComponent } from './dashbord-user/dashbord-user.component';


export const routes: Routes = [

    {path:'',redirectTo:'login', pathMatch:'full'},
{path:'login',component:LoginComponent},
{path:'home',component:HomeComponent , canActivate: [authGuard],children:[
//{path:'addchallneg',component:AddChallengeComponent},
{path:'list',component:ListeChaComponent},
//{ path: 'challenges/view/:id', component: ViewChallengeComponent },
{ path: 'sale', component: AddSalesTransactionComponent },
{ path: 'sale/liste', component: ListSaleComponent },
//{ path: 'gagnant', component: GagnantsComponent },
{ path: 'produit', component: AddProdComponent },
{ path: 'condition', component: ConditionComponent },
{ path: 'listP', component: ListProdComponent },{ path: 'region', component: AddRegionComponent },{ path: 'agence', component: AgenceComponent },{ path: 'score/:id', component: ScoreRuleComponent },
{ path: 'dashbordadmin', component: DashbordAdminComponent }, { path: 'produits/edit/:id', component: EditProduitComponent },{ path: 'challnge', component: AddChallengeeComponent },
{ path: 'add/:id', component: ComposantComponent },{ path: 'view/:id', component: ViewComponent },{ path: 'gagnant', component: RankingComponent },{ path: 'edit/:id', component: EditComponent },{ path: 'ranking', component: RankingComponent },{ path: 'Participation', component: ListParticipationComponent }

,{ path: 'add_Par', component: ParticipantComponent },{ path: 'ListPar', component: ListeParticipantComponent },{ path: 'editP/:id', component:EditParComponent  },

{ path: 'gain', component: GainComponent } ,{ path: 'notfi', component: AdminNotificationComponent },{ path: 'dahporadmin', component: DashbordAdminComponent },{ path: 'dahpoPar', component: DashbordUserComponent }

,{
  path: 'challenge-stepper',
  component: AddChallengeStepperComponent
}

]



}


];
