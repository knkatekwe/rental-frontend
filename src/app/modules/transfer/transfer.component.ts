import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RentalAgreement } from 'src/app/core/models/rental-agreement';
import { RentalAgreementService } from 'src/app/core/services/rental-agreement.service';
import { TransferService } from 'src/app/core/services/transfer.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  form: FormGroup;
  formSubmitted = false;
  user: any;
  isSubmitting: boolean;
  id: any;

  rentalAgreement: RentalAgreement;

  //validation messages
  accountValidationMessages = {
    transferAddress: [
      { type: 'required', message: 'Transfer Address is required' },
      {
        type: 'minLength',
        message: 'Transfer Address must be 42 characters long',
      },
      {
        type: 'maxLength',
        message: 'Transfer Address must be 42 characters long',
      },
    ],
    amount: [
      { type: 'required', message: 'Amount is required' },
      { type: 'pattern', message: 'Amount must be a positive number' },
    ],
    remarks: [{ type: 'required', message: 'Remarks are required' }],
  };

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private transferService: TransferService,
    private rentalAgreementService: RentalAgreementService,
  ) {}

  ngOnInit() {
    this.formSubmitted = false;
    this.isSubmitting = false;
    this.user = {
      address: '',
      transferAddress: '',
      balance: '',
      amount: '',
      remarks: '',
    };
    this.getAccountAndBalance();
    this.createForms();

    this.id = this.route.snapshot.paramMap.get('id');

    this.rentalAgreementService.getRentalAgreement(this.id).subscribe((res)=>{
      this.rentalAgreement = res
    })

    // this.route.data.subscribe((data: { rentalAgreement: RentalAgreement }) => {
    //   this.rentalAgreement = data.rentalAgreement;
    //   console.log(this.rentalAgreement);
    // });

  }

  createForms() {
    this.form = this.fb.group({
      transferAddress: new FormControl(
        this.user.transferAddress,
        Validators.compose([
          Validators.required,
          Validators.minLength(42),
          Validators.maxLength(42),
        ])
      ),
      amount: new FormControl(
        this.user.amount,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[+]?([.]\\d+|\\d+[.]?\\d*)$'),
        ])
      ),
      remarks: new FormControl(
        this.user.remarks
        // Validators.compose([Validators.required])
      ),
    });
  }

  getContract() {
    this.transferService
      .getContractBalance()
      .then(function () {})
      .catch(function (error) {
        console.log(error);
      });
  }

  submitForm() {
    if (this.form.invalid) {
      alert('transfer.components :: submitForm :: Form invalid');
      return;
    } else {
      console.log('transfer.components :: submitForm :: this.userForm.value');
      console.log(this.form.value);
      // TODO: service call
      this.transferService
        .transferEther(this.form.value)
        .then(function () {})
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  getAccountAndBalance = () => {
    const that = this;
    this.transferService
      .getUserBalance()
      .then(function (retAccount: any) {
        that.user.address = retAccount.account;
        that.user.balance = retAccount.balance;
        console.log('transfer.components :: getAccountAndBalance :: that.user');
        console.log(that.user);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
