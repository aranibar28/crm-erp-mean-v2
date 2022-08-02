import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProspectService } from 'src/app/services/prospect.service';
import { success_alert, error_alert } from 'src/app/helpers/alerts';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
})
export class CallComponent implements OnInit {
  public path = environment.base_url + '/collaborators/image/';
  public id = this.activatedRoute.snapshot.parent?.params['id'];
  public calls: Array<any> = [];
  public initForm: any = {};
  public load_data = true;
  public load_btn = false;
  public p: any = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private prospectService: ProspectService,
    private fb: FormBuilder
  ) {}

  myForm: FormGroup = this.fb.group({
    date: [, [Validators.required]],
    time: ['08:00', [Validators.required]],
    result: ['', [Validators.required]],
    note: [,],
  });

  ngOnInit(): void {
    this.init_data();
    this.initForm = this.myForm.value;
  }

  init_data() {
    this.prospectService.read_calls(this.id).subscribe({
      next: (res) => {
        this.calls = res.data;
        this.load_data = false;
      },
    });
  }

  register() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.load_btn = true;
    this.myForm.addControl('customer', this.fb.control(this.id));
    this.prospectService.create_call(this.myForm.value).subscribe({
      next: (res) => {
        this.load_btn = false;
        if (res.data) {
          $('#modal_default').modal('hide');
          success_alert('Se guardaron los datos.');
          this.myForm.reset(this.initForm);
          this.init_data();
        } else {
          error_alert(res.msg);
        }
      },
      error: (err) => {
        error_alert(err.msg);
        this.load_btn = false;
      },
    });
  }

  validators(name: string) {
    const input = this.myForm.controls[name];
    return input.errors && input.touched;
  }
}
