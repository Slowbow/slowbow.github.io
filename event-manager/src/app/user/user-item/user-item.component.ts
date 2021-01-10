import { Component, Input, OnInit, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { defaultDialogConfig } from 'src/app/shared/mat-dialog-default-config';
import { UserManageComponent } from '../user-manage/user-manage.component';
import { UserDataService } from '../../services/user.data.service';
import { userActions } from '../store/user.action.types';
import { UserState } from '../store/reducers';
//import {EventEmitter } from 'users';
import { userDeleted } from '../store/user.actions';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})

export class UserItemComponent implements OnInit {
  @Input() user: User = null;

  constructor(
    private dialog: MatDialog,
    private userDataService: UserDataService,
    private store: Store<UserState>) {
  }
//ngOnInit bilo prazno  ngOnInit(): void
  ngOnInit(): void {

  }

  onEditUser(): void {
    const data = {
      dialogTitle: 'Edit User',
      user: this.user,
      mode: 'edit'
    };
    const dialogConfig = {...defaultDialogConfig(), ...{data}};
    this.dialog.open(UserManageComponent, dialogConfig)
      .afterClosed()
      .subscribe((result) => {
      });
  }

  onDeleteUser(): void {
    const data = {
      dialogTitle: 'Confirm',
      data: {
        message: 'Do you really want to delete this user?'
      }
    };
    const dialogConfig = {...defaultDialogConfig(), ...{data}};
    this.dialog.open(ConfirmDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((result) => {
        if (result.action === 'yes') {
          this.delete();
        }
      });
  }

  private delete(): void {
    //Task 1 - Delete functionality added
    this.store.dispatch(userDeleted({id: this.user.id}));
    console.log(this);
  }
}
