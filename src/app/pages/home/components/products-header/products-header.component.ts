import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: `./products-header.component.html`
})
export class ProductsHeaderComponent implements OnInit {
  sort = 'desc';
  itemShowCount = 12;

  @Output() columnsCounChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  constructor(){}

  ngOnInit(): void {
      
  }

  onSortUpdated(newSort : string) : void {
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }

  onItemsUpdate(count : number) : void{
    this.itemShowCount  = count;
    this.itemsCountChange.emit(count);
  }

  onColumnsUpdated(columnsNumber : number) : void {
    this.columnsCounChange.emit(columnsNumber);
  }
}
