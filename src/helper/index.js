import {DateTime} from 'luxon';

export function camelSentence(str) {
  return (' ' + str)
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
      return chr.toUpperCase();
    });
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function timeOnly(str) {
  const converted = DateTime.fromISO(str)
    .setZone('Asia/Jakarta')
    .toFormat('HH:mm');
  return converted;
}

export function fullDate(str) {
  const converted = DateTime.fromISO(str)
    .setZone('Asia/Jakarta')
    .toFormat('dd, MMMM  yyyy HH:mm');
  return converted;
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}
