import slugify from '@sindresorhus/slugify';

export default function (str) {
  return slugify(str, { allow_leading_dot: false });
}