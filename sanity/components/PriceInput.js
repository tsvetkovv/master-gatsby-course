import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value) {
  return PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

const formatMoney = Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
}).format;

const PriceInput = ({
  type: { title, description, name },
  value,
  onChange,
  forwardedRef,
}) => (
  <div>
    <h2>
      {title} - {typeof value === 'number' ? formatMoney(value / 100) : ''}
    </h2>
    <p>{description}</p>
    <input
      type={name}
      value={value}
      onChange={(event) => onChange(createPatchFrom(event.target.value))}
      ref={forwardedRef}
    />
  </div>
);

PriceInput.focus = function () {
  this._inputElement.focus();
};

export default React.forwardRef((props, ref) => (
  <PriceInput {...props} forwaredRef={ref} />
));
