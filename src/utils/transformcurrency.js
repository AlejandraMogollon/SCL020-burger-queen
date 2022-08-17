export const getFormatCurrency = (amount) => {
  return Intl.NumberFormat("es-CL").format(amount).toString();
};
