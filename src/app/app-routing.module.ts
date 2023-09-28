import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobProfileComponent } from './Components/Profiles/job-profile/job-profile.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { Error404Component } from './Components/ErrorComponents/error404/error404.component';
import { IndexComponent } from './Components/Home/index/index.component';

const routes: Routes = [
  {
    path:'',
    component:IndexComponent
  },
{
  path:'profile',
  component:JobProfileComponent
},

{
  path:'contact-us',
  component:ContactUsComponent 
},
{
  path:'error404',
  component:Error404Component
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
