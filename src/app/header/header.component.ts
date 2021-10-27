import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppStateSelector} from "../selectors/app-state.selector";
import {AdjustableValues} from "../interfaces/adjustable-values";
import {changeValuesAction} from "../actions/app.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentPath: string = '';

  headerMenu = [
    {
      title: "Solutions",
      link: 'solutions'
    },
    {
      title: "Local Errors",
      link: 'lte'
    },
    {
      title: "Global Errors",
      link: 'gte'
    },
  ];

  hidden = {
    'x0': false,
    'X': false,
    'y0': false,
    'N': false,
    'n0': true,
  }

  hiddenConfiguration: any = {
    'solutions': {
      'x0': false,
      'X': false,
      'y0': false,
      'N': false,
      'n0': true,
    },

    'lte': {
      'x0': false,
      'X': false,
      'y0': false,
      'N': false,
      'n0': true,
    },
    'gte': {
      'x0': true,
      'X': true,
      'y0': true,
      'N': false,
      'n0': false,
    }
  }

  valueForm = new FormGroup({
    'x0': new FormControl(0, [Validators.pattern('[0-9\-.]*')]),
    'X': new FormControl(0, [Validators.pattern('[0-9\-.]*')]),
    'y0': new FormControl(0, [Validators.pattern('[0-9\-.]*')]),
    'N': new FormControl(0, [Validators.pattern('[0-9]*')]),
    'n0': new FormControl(0, [Validators.pattern('[0-9]*')]),
  })

  onFormChange() {
    console.log('updating');
    if (this.valueForm.invalid)
      return;
    let result: {[key: string]: number} = {
      y0: -1,
      x0: -1,
      N: -1,
      X: -1,
      n0: -1,
    }
    for (let control in this.valueForm.controls) {
      if (control in result)
        result[control] = parseFloat(this.valueForm.get(control)?.value)
    }
    this.store.dispatch(changeValuesAction({
      values: result as any
    }));
  }


  constructor(public router: Router, public store: Store) {
    this.store.select(AppStateSelector).subscribe(state => {
       this.valueForm.setValue(state.values)
    });

  }


  go(path: string) {
    this.router.navigate([path]).then(() => {
      console.log(`Navigated to ${path}`);
      this.currentPath = path;
      this.hidden = this.hiddenConfiguration[path];
    })
  }



  ngOnInit(): void {
  }

  ngDoCheck() {
    this.currentPath = this.router.url.substring(1);
  }

  ngAfterViewInit() {
  }

}
