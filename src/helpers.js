export const decimalAdjust = (type, value, exp) => {
  // Se exp é indefinido ou zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // Se o valor não é um número ou o exp não é inteiro...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Transformando para string
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Transformando de volta
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

export const dbToMul = (value) => {
  return Math.pow(10, (value / 20))
}

export const mulToDb = (value) => {
  return Math.round(20 * Math.log10(value) * 100) / 100
}