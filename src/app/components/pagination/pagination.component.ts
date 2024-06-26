import { Component, OnInit } from '@angular/core';
import { StateService } from '@/service/state/state.service';
import { MainComponent } from '@/layout/main/main.component';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  constructor(protected stateService: StateService, protected mainComponent: MainComponent) { }

  ngOnInit(): void { }

  handlePaginate(pageNumber: number, $event: Event) {
    $event.preventDefault();
    this.stateService.updatePagination(pageNumber);
    this.mainComponent.getBeers()
  }

}
