export const validators = (name: string, form: any) => {
  const input = form.controls[name];
  return input.errors && input.touched;
};

export const sortby = (key: string, toggle: boolean, array: Array<any>[]) => {
  let direction = toggle ? 1 : -1;
  array.sort((a: any, b: any) => {
    if (a[key] < b[key]) {
      return 1 * direction;
    }
    if (a[key] > b[key]) {
      return -1 * direction;
    }
    return 0;
  });
};
