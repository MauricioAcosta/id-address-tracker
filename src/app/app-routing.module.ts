import { IpAddressTrackerComponent } from './ip-address-tracker/ip-address-tracker.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'prefix' },
  {
    path: 'inicio',
    component: IpAddressTrackerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
