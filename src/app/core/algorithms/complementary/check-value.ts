import * as _ from "lodash";

export function checkValue(...t: number[]) {
  return t.find(x => !(_.isFinite(x) && _.isNumber(x))) == undefined;
}
