import React from 'react';

interface Props {
  amount: number;
}

function FormattedPrice({ amount }: Props) {
  const formattedAmount = new Number(amount).toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  });
  return <span>{formattedAmount}</span>;
}

export default FormattedPrice;
