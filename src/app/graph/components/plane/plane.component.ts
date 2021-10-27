import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Point2} from "../../../core/geometry/classes/point2";
import {Store} from "@ngrx/store";
import {AppStateSelector} from "../../../selectors/app-state.selector";
import {AppState} from "../../../reducers/app.reducer";
import {EventService} from "../../../event/event.service";
import {NumbersBuilderService} from "../../services/numbers-builder.service";
import {delta, epsilon} from "./permanent/permanent";
import {ViewService} from "../../services/view.service";
import {GridGenerator} from "../../classes/grid-generator";
import * as Color from 'color';
import {PlotData} from "../../interfaces/plot-data";
import {FunctionComponent} from "../function/function.component";

@Component({
  selector: 'app-plane',
  templateUrl: './plane.component.html',
  styleUrls: ['./plane.component.scss']
})
export class PlaneComponent implements OnInit {

  @ViewChildren(FunctionComponent) functions?: QueryList<FunctionComponent>;
  @Input('plot') plotData: PlotData[] = [];
  @ViewChild('SVGPlotter') viewport?: ElementRef<SVGElement>;
  protected _transformation!: {
    scale: Point2,
    shift: Point2
  }
  private height: number = 0;
  private width: number = 0;

  constructor(public store: Store,
              public changeDetectorRef: ChangeDetectorRef,
              public eventService: EventService,
              public numberBuilder: NumbersBuilderService,
              public viewService: ViewService) {
    this.store.select(AppStateSelector)
      .subscribe((state: AppState) => {
        this._transformation = state.viewTransform
        /*        this._values = state.values;
                this._derivative = state.derivative;
                this._solution = state.solution;
                this._constant = state.C;*/
      });
  }

  protected _origin = new Point2(0, 0);

  /*protected _values?: AdjustableValues;
  protected _derivative?: ExplicitFunction2;
  protected _solution?: ExplicitFunction2;
  protected _constant?: ExplicitFunction2;*/

  get origin(): Point2 {
    return this._origin.add(this._transformation.shift);
  }

  generateGrid(): string[] {
    const xNumbers = this.generateNumbers('x', delta / 5)[0];
    const yNumbers = this.generateNumbers('y', delta / 5)[0];
    return [
      new GridGenerator().produceSVGPath({points: xNumbers.map(p => this.origin.x + p.value), axis: 'x-axis'}) + ' ' +
      new GridGenerator().produceSVGPath({points: yNumbers.map(p => this.origin.y + p.value), axis: 'y-axis'}),
    ]

  }

  generateNumbers(axis: 'x' | 'y', _delta: number = delta) {
    const length = axis == 'x' ? this.width : this.height;
    return this.numberBuilder.buildLevels({
      epsilon: epsilon,
      eta: (axis == 'x' ? this.getScalar().x : this.getScalar().y) / delta,
      delta: _delta,
      range: [-this.origin[axis], length - this.origin[axis]]
    });
  }

  /*  getRange(): [number, number] {
      return [this._values!.x0, this._values!.X];
    }

    getDefiniteSolution() {
      const C = this._constant!(this._values!.x0, this._values!.y0)
      return (x: number) => this._solution!(x, C);
    }*/

  getGridColor(level: number) {
    return new Color('#c8c8c8').darken(.25 / ((level) + 1) ** 2).hex();
  }

  /*  getEulerApproximation() {
      if (this._values && this._derivative) {
        return buildEulerApproximation(this._derivative, this._values.N, new Point2(this._values.x0, this._values.y0), this._values.X);
      } else return [];
    }

    getFunction() {
      return this._solution;
    }*/

  getHeight() {
    return this.height;
  }

  getOriginShift(delta: number, direction: 'y-axis' | 'x-axis') {
    if (direction == 'x-axis') {
      return this.origin.add(new Point2(delta, 0));
    } else {
      return this.origin.add(new Point2(0, delta));
    }
  }

  getScalar() {
    return this._transformation.scale.times(delta);
  }

  getWidth() {
    return this.width;
  }

  ngAfterViewInit() {
    this.width = this.viewport?.nativeElement.getBoundingClientRect().width ?? 0;
    this.height = this.viewport?.nativeElement.getBoundingClientRect().height ?? 0;
    this.changeDetectorRef.detectChanges();

  }

  ngDoCheck() {
    this.width = this.viewport?.nativeElement.getBoundingClientRect().width ?? 0;
    this.height = this.viewport?.nativeElement.getBoundingClientRect().height ?? 0;
    this.changeDetectorRef.detectChanges();
    this.viewService.center = new Point2(this.width, this.height);
  }

  ngOnInit(): void {
  }
}
