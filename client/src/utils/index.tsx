export function validation(array: Array<any>, value: string) {
    const [inValid] = array.filter((error: Error) => error.message.includes(value))
      if (inValid) return inValid.message
      return [];
};