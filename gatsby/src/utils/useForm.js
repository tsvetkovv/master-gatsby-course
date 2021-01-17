import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue({ target }) {
    let { value } = target;
    if (target.type === 'number') {
      value = parseFloat(value);
    }

    setValues({
      ...values,
      [target.name]: value,
    });
  }

  return { values, updateValue };
}
