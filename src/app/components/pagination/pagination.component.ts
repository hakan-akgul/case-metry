import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/service/state/state.service';
import { MainComponent } from 'src/app/layout/main/main.component';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  constructor(protected stateService: StateService, protected mainComponent: MainComponent) { }

  ngOnInit(): void { }

  paginate(pageNumber: number, $event: Event) {
    $event.preventDefault();
    this.stateService.updatePagination(pageNumber);
    this.mainComponent.getBeers()
  }

}
