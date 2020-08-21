import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {

  
  
  allUser: object;
  id:number;

  constructor(private backend: UserService, private router: Router) {
    
   }

  delUser(user){
    if(confirm("Are you sure yo want to cancel?"))
      this.backend.delUser(user).subscribe(()=>{
      this.getfitness();
    })
  }

  
  editUser(user){
    this.router.navigateByUrl("place-fitness-trainer-appointment/"+ user.id)
    console.log(user.id);
  }

  ngOnInit() {
    this.getfitness();
  }
  
  getfitness() {
    this.backend.getfitnessdata().subscribe((response) =>{
      this.allUser = response;
    });

  }

  
}
