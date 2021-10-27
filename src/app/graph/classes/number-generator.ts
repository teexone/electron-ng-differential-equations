export class NumberGenerator {
  protected baseNumber: number;
  protected omit: (value: number, number: number) => boolean = () => false;
  protected step: number;
  private _currentStep: number = 0;


  constructor(baseNumber: number, step: number, omit?: (value: number, number: number) => boolean) {
    this.baseNumber = baseNumber;
    if (omit)
      this.omit = omit;
    this.step = step;
  }

  next(): {value: number, number: number} {
    let x: any = this.baseNumber + this.step * this._currentStep++;
    while (this.omit(x, this._currentStep)) {
      x =  this.baseNumber + this.step * this._currentStep++;
    }
    x = {value: x, number: this._currentStep}
    return x;
  }
}
