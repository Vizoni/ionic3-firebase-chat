import { NgModule } from '@angular/core';
import { CustomLoggedHeaderComponent } from './custom-logged-header/custom-logged-header.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
@NgModule({
	declarations: [CustomLoggedHeaderComponent,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent,
    ProgressBarComponent],
	imports: [],
	exports: [CustomLoggedHeaderComponent,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent,
    ProgressBarComponent]
})
export class ComponentsModule {}
