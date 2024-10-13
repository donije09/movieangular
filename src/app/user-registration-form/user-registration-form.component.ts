// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Import to close the dialog
import { FetchApiDataService } from '../fetch-api-data.service'; // Import API calls
import { MatSnackBar } from '@angular/material/snack-bar'; // Import to show notifications
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  // Function for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here
      this.dialogRef.close(); // Close the modal on success
      this.snackBar.open(result, 'OK', { duration: 2000 }); // Show success notification
    }, (result) => {
      this.snackBar.open(result, 'OK', { duration: 2000 }); // Show error notification
    });
  }
}
