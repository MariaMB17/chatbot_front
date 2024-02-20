
//@ts-ignore
const NumberFormat = ({ number }) => {
  
  const formatter = new Intl.NumberFormat('es-VE', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return <>{formatter.format(number)}</>;
};

export default NumberFormat