import { NgModule } from '@angular/core';
import { CustomLoggedHeaderComponent } from './custom-logged-header/custom-logged-header.component';
import { MessageBoxComponent } from './message-box/message-box.component';
@NgModule({
	declarations: [CustomLoggedHeaderComponent,
    MessageBoxComponent],
	imports: [],
	exports: [CustomLoggedHeaderComponent,
    MessageBoxComponent]
})
export class ComponentsModule {}
