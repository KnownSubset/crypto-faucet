import { helper } from '@ember/component/helper';

export function parseInt(params) {
  if (!params || params && params.length > 2) {
    throw new TypeError('parseInt: Invalid Number of arguments, at most 2');
  }
  const [number, base=10] = params;
  return Number.parseInt(number, base);
}

export default helper(parseInt);
