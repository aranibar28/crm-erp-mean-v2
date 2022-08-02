import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProspectService } from 'src/app/services/prospect.service';
import { success_alert, error_alert } from 'src/app/helpers/alerts';
declare var $: any;

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
})
export class MailComponent implements OnInit {
  public id = this.activatedRoute.snapshot.parent?.params['id'];
  public mails: Array<any> = [];
  public initForm: any = {};
  public config: any = {};
  public load_data = true;
  public load_btn = false;
  public p: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private prospectService: ProspectService,
    private fb: FormBuilder
  ) {}

  myForm: FormGroup = this.fb.group({
    subject: [, [Validators.required]],
    message: [, [Validators.required]],
  });

  ngOnInit(): void {
    this.config = { height: 350 };
    this.init_data();
    this.initForm = this.myForm.value;
  }

  init_data() {
    this.prospectService.read_mails(this.id).subscribe({
      next: (res) => {
        this.mails = res.data;
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
    this.prospectService.create_mail(this.myForm.value).subscribe({
      next: (res) => {
        this.load_btn = false;
        if (res.data) {
          $('#modal_default').modal('hide');
          success_alert('Se envió un correo al cliente.');
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
