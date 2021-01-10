import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UserDataService } from '../../services/user.data.service';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { UserState } from '../store/reducers';
import { userCreated, userEdited } from '../store/user.actions';
import { defaultDialogConfig } from 'src/app/shared/mat-dialog-default-config';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {
  form: FormGroup;
  dialogTitle: string;
  user: User;
  public disabled = false;
  mode: 'edit' | 'create';
  nameMaxLength = 80;
  fullNamePattern ="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
  usernameMinLength = 3;
  emailMaxLength = 100;
  unsavedChanges = false;
  @ViewChild('uploader') uploader: ElementRef;
  private file: File = null;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UserManageComponent>,
    private userDataService: UserDataService,
    private store: Store<UserState>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data) {

    this.dialogTitle = data.dialogTitle;
    this.user = data.user;
    this.mode = data.mode;
    const formElements = {
      name: [null, Validators.compose([Validators.required, Validators.pattern(this.fullNamePattern), Validators.minLength(1), Validators.maxLength(this.nameMaxLength)])],
      username: [null, Validators.compose([Validators.required, Validators.minLength(this.usernameMinLength)])],
      email: [null, Validators.compose([Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(this.emailMaxLength)])]
    };
    this.form = this.formBuilder.group(formElements);
    if (this.mode === 'edit') {
      this.form.patchValue({ ...this.user });
    }
  }

  ngOnInit(): void {

  }

  onSubmitForm(): void {
    if (!this.form.invalid) {
      const change: User = {
        ...this.user,
        ...this.form.value,
      };

      if (this.mode === 'edit') {
        this.update(change);
      }
      else if (this.mode === 'create') {
        this.save(change);
      }
    }
  }

  private update(changes: User): void {
    this.userDataService.update(changes)
      .subscribe(() => {
        const updatedUser: Update<User> = {
          id: changes.id,
          changes
        };
        this.unsavedChanges = false;
        this.store.dispatch(userEdited({ update: updatedUser }));
        this.dialogRef.close();
      });
  }

  private save(changes: User): void {
    this.userDataService.save(changes)
      .subscribe((user) => {
        this.unsavedChanges = false;
        this.store.dispatch(userCreated({ user }));
        this.dialogRef.close();
      });
  }

  onCancel(): void {
    if (this.unsavedChanges) {
      const data = {
        dialogTitle: 'Confirm',
        data: {
          message: 'You have unsaved changes, Do you really want to cancel the changes?'
        }
      };
      const dialogConfig = { ...defaultDialogConfig(), ...{ data } };
      this.dialog.open(ConfirmDialogComponent, dialogConfig)
        .afterClosed()
        .subscribe((result) => {
          if (result.action === 'yes') {
            this.dialogRef.close();
          }
        });
    }
    else {
      this.dialogRef.close();
    }
  }

}
