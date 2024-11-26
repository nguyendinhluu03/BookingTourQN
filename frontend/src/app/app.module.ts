import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrangChuComponent } from './home/trang-chu/trang-chu.component';
import { TourListComponent } from './home/tour/tour-list/tour-list.component';
import { HttpClientModule, HttpClient, withFetch } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TourDetailComponent } from './home/tour/tour-detail/tour-detail.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TourDMComponent } from './home/tour/tour-dm/tour-dm.component';
import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
import { Xacthuc } from './admin/xacthuc';
import { UserService } from './service/user-service';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AdminModule
  ],
  providers: [
    Xacthuc,
    UserService,
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

