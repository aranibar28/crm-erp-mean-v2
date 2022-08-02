import { Component, OnInit } from '@angular/core';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { environment } from 'src/environments/environment';
import { sortby } from 'src/app/helpers/functions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-collaborator',
  templateUrl: './index-collaborator.component.html',
})
export class IndexCollaboratorComponent implements OnInit {
  public path = environment.base_url + '/collaborators/image/';
  public collaborators: Array<any> = [];
  public collaborators_arr: Array<any> = [];
  public load_data: boolean = true;
  public toggle: boolean = false;
  public filter: string = '';
  public key: string = '';
  public p: number = 1;

  constructor(private collaboratorService: CollaboratorService) {}

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.collaboratorService.read_collaborators().subscribe({
      next: (res) => {
        this.load_data = false;
        this.collaborators = res.data;
        this.collaborators_arr = res.data;
      },
      error: (err) => {
        this.load_data = false;
        console.log(err);
      },
    });
  }

  change_status(id: any, status: any) {
    const word = status ? 'desactivado' : 'activado';
    this.collaboratorService.change_status(id, { status }).subscribe({
      next: (res) => {
        if (res.data) {
          this.init_data();
          Swal.fire('Listo!', `Estado ${word}.`, 'success');
        } else {
          Swal.fire('Error!', res.msg, 'error');
        }
      },
    });
  }

  delete_data(id: string, name: string) {
    Swal.fire({
      title: 'Eliminar Usuario',
      text: `¿Desea eliminar el usuario ${name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.collaboratorService.delete_collaborator(id).subscribe((res) => {
          if (res.data) {
            this.init_data();
            Swal.fire('Listo!', `El usuario ${name} fue eliminado.`, 'success');
          } else {
            Swal.fire('Error!', res.msg, 'error');
          }
        });
      }
    });
  }

  search() {
    if (this.filter) {
      var term = new RegExp(this.filter, 'i');
      this.collaborators = this.collaborators_arr.filter(
        (item) =>
          term.test(item.full_name) ||
          term.test(item.email) ||
          term.test(item.dni)
      );
    } else {
      this.collaborators = this.collaborators_arr;
    }
  }

  sort(key: string) {
    this.toggle = !this.toggle;
    sortby(key, this.toggle, this.collaborators);
  }
}
