import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CourseService } from 'src/app/services/course.service';
import { CycleService } from 'src/app/services/cycle.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expired-cycle',
  templateUrl: './expired-cycle.component.html',
})
export class ExpiredCycleComponent implements OnInit {
  public img_url = environment.img_url;
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public data: boolean = false;
  public id: any;
  public course: any = {};
  public cycles: Array<any> = [];
  public all_cycles: Array<any> = [];

  public filter = 'Todos';

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private cycleService: CycleService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
    this.init_data();
  }

  back(): void {
    this.location.back();
  }

  init_data() {
    this.courseService.read_course_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.load_data = false;
          this.data = true;
          this.course = res.data;
          this.list_cycles();
        } else {
          this.load_data = false;
          this.data = false;
        }
      },
      error: (err) => {
        this.data = false;
        console.log(err);
      },
    });
  }

  list_cycles() {
    this.cycleService.read_expired_cycles(this.id).subscribe({
      next: (res) => {
        this.cycles = res.data;
        this.all_cycles = res.data;
      },
    });
  }

  search() {
    if (this.filter === 'Todos') {
      this.cycles = this.all_cycles;
    } else {
      this.cycles = this.all_cycles.filter(
        (item) => item.cycle.nivel == this.filter
      );
    }
  }

  change_status(id: any, status: any) {
    const word = status ? 'desactivado' : 'activado';
    this.cycleService.change_status_cycle(id, { status }).subscribe({
      next: () => {
        this.init_data();
        Swal.fire('Listo!', 'Estado ' + word, 'success');
      },
    });
  }
}
