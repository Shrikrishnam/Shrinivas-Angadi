import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../_services';
import { Router } from '@angular/router';

export class Contact {
  constructor(
    public firstname: string,
    public lastname: string,
    public phonenumber: number,
    public email: string,
    public message: string
  ) { }
}
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html'
})
export class ContactUsComponent implements OnInit {
  @Output() contactdata = new EventEmitter<Contact>();
  contactForm: FormGroup;
  public obj: any = {};
  constructor(private fb: FormBuilder,private backend: UserService,private router: Router) { }


  ngOnInit() {
    this.contactForm = this.fb.group({
      firstname: ["", [Validators.required,Validators.pattern("^[a-zA-Z ]*$")]],
      lastname: ["", [Validators.required,Validators.pattern("^[a-zA-Z ]*$")]],
      phonenumber: ['', [ Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.minLength(10), Validators.maxLength(10)]],
      email: ["", [Validators.required,Validators.pattern("[^ @]*@[^ @]*")]],
      message:["",[Validators.required]]
    });
  }

  onSubmit() {
    this.obj = { ...this.contactForm.value, ...this.obj };
    this.contactForm.value;
    this.backend.postcontactdata(this.contactForm.value).subscribe((data)=>
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.contactForm.value",
      this.contactForm.value
    ));

    if (this.contactForm.valid) {
      this.contactdata.emit(
        new Contact(
          this.contactForm.value.firstname,
          this.contactForm.value.lastname,
          this.contactForm.value.phonenumber,
          this.contactForm.value.email,
          this.contactForm.value.message
        )
      );

    this.backend.postcontactdata(this.contactForm.value);
    this.router.navigateByUrl("landing-page")

    }
  }
}
