import { Component, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: `filters.component.html`
})
export class FiltersComponent implements OnInit , OnDestroy{
  @Output() showCategory = new EventEmitter<string>();
  categories :Array<string> | undefined;
  categorySubscription : Subscription | undefined;

  constructor(private storeService : StoreService){
    this.storeService.getAllCategories();
  }
  ngOnDestroy(): void {
    if(this.categorySubscription){
      this.categorySubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
   this.categorySubscription =  this.storeService.getAllCategories().subscribe((data)=>{
      this.categories = data;
    })
  }
  
  onShowCategory( category : string) : void{
    this.showCategory.emit(category);
  }
}
