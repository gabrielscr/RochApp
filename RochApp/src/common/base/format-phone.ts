export function formatPhone(phone: string, country: string) {
  if (!phone)
    return phone;

  if (!country)
    return phone;

  if (country.toLowerCase() != "brasil"
    && country.toLowerCase() != "brazil"
    && country.toLowerCase() != "br"
    && country.toLowerCase() != "bra")
    return phone;

  var reg = new RegExp(/^[0-9_\.\s\(\)-]*$/);

  if (!reg.test(phone))
    return phone;

  phone = phone.replace(/[^0-9]/, "");

  if (phone[0] === '0')
    phone = phone.substring(1, phone.length);

  var result = phone;

  if (phone.length >= 8 && phone.length <= 11) {
    var insert = function (position, c) {
      result = [result.slice(0, position), c, result.slice(position)].join('');
    }

    insert(result.length - 4, "-");

    if (phone.length === 10 || phone.length === 11) {
      insert(0, "(");
      insert(3, ") ");
    }
  }

  return result;
};
