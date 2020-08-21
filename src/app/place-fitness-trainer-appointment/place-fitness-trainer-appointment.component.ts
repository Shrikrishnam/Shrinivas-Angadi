import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from '../_services';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


export class Fitness {
  constructor(
    public firstname:string,
    public lastname: string,
    public age:number,
    public email: string,
    public streetaddress: string,
    public pincode: number,
    public packages: string,
    public gender: string,
    public city: string,
    public state: string,
    public country:string,
    public phonenumber:number,
    public inr:number,
    public paisa:number,

  /*  public inr: number,
    public paisa: number,
    public city: string,
    public state: string,
    public country: string,
    public phonenumbernumber: number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string*/
  ) { }
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html'
  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {


  @Output() fitnessdata = new EventEmitter<Fitness>();
  fitnessForm: FormGroup;
  public obj: any = {};
  userData:any={};
  
  constructor(private fb: FormBuilder, private backend: UserService, private router: Router, private actRoute: ActivatedRoute) { }
  

  ngOnInit() {
    let id = this.actRoute.snapshot.params.id;

    if(id && id !=0){
      this.backend.getUserData(id).subscribe(data=>{
        this.setData(data);
      })
    }



    this.fitnessForm = this.fb.group({
      firstname : ["", [Validators.required,Validators.pattern("^[a-zA-Z ]*$")]],
      lastname : ["", [Validators.required,Validators.pattern("^[a-zA-Z ]*")]],
      age : ["", [Validators.required, Validators.min(6), Validators.max(60)]],
      email: ["", [Validators.required,Validators.pattern("[^ @]*@[^ @]*")]],  
      phonenumber: ['', [ Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.minLength(10), Validators.maxLength(10)]],
      streetaddress : ["", [Validators.required]],
      city : ["", [Validators.required,Validators.pattern("^[a-zA-Z ]*$")]],
      state : ["", [Validators.required,Validators.pattern("^[a-zA-Z ]*$")]],
      country : ["", [Validators.required,Validators.pattern("^[a-zA-Z ]*$")]],
      pincode : ["", [Validators.required, Validators.min(100000), Validators.max(999999)]],
      packages : ["", [Validators.required]],
      gender: ["",[Validators.required]],
      inr: ["", [Validators.required, Validators.min(1000), Validators.max(999999)]],
      paisa:["", [Validators.required, Validators.min(10), Validators.max(99)]],
    })  
  }

  setData(data: Object){
    this.userData=data;
    this.fitnessForm.setValue({
      firstname:this.userData.firstname,
      lastname:this.userData.lastname,
      age:this.userData.age,
      email:this.userData.email,
      streetaddress:this.userData.streetaddress,
      city:this.userData.city,
      state:this.userData.state,
      country:this.userData.country,
      phonenumber:this.userData.phonenumber,
      pincode:this.userData.pincode,
      packages:this.userData.packages,
      gender:this.userData.gender,
      inr:this.userData.inr,
      paisa:this.userData.paisa,

    })
  }

  onSubmit() {
    this.obj = {...this.fitnessForm.value, ...this.obj};
    this.fitnessForm.value;
    
    if(this.fitnessForm.valid){
      this.fitnessdata.emit(
        new Fitness(
          this.fitnessForm.value.firstname,
          this.fitnessForm.value.lastname,
          this.fitnessForm.value.age,
          this.fitnessForm.value.email,
          this.fitnessForm.value.phonenumber,
          this.fitnessForm.value.streetaddress,
          this.fitnessForm.value.city,
          this.fitnessForm.value.state,
          this.fitnessForm.value.country,
          this.fitnessForm.value.pincode,
          this.fitnessForm.value.packages,
          this.fitnessForm.value.gender,
          this.fitnessForm.value.inr,
          this.fitnessForm.value.paisa,
        )
      );

      //store in database
      if(!this.userData.id)
          this.backend.postfitnessdata(this.fitnessForm.value).subscribe(data=>console.log(data));
      else
          this.backend.updatefitnessdata(this.fitnessForm.value, this.userData.id).subscribe(data=>console.log(data));
      this.backend.postfitnessdata(this.fitnessForm.value);
      this.router.navigateByUrl("landing-page")
    }else{
      console.log("enter all fields");
      return;
    }
  }
    
}
