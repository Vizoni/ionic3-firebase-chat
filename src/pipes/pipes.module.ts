import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize/capitalize';
@NgModule({
	declarations: [CapitalizePipe],
	imports: [],
	exports: [CapitalizePipe]
})
export class PipesModule {}
