import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserItemComponent } from './user-item/user-item.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { MaterialModule } from '../material/material.module';
import { StoreModule } from '@ngrx/store';
import * as fromUserState from './store/reducers';
import { UserDataService } from '../services/user.data.service';
import { CoreModule } from '../core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserListComponent,
    UserItemComponent,
    UserManageComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    StoreModule.forFeature(fromUserState.userStateFeatureKey, fromUserState.userReducers),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [
    UserDataService,
    DatePipe
  ]
})
export class UserModule { }
