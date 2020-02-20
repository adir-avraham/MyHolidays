import { Error } from 'sharing-interfaces';
import moment from 'moment';

export function validation(array: Array<any>, value: string) {
    const [inValid] = array.filter((error: Error) => error.message.includes(value))
      if (inValid) return inValid.message
      return [];
};

export function convertDateFormat(date: Date) {
  const newFormat = moment(date).format("DD/MM/YYYY");
  return newFormat;
};