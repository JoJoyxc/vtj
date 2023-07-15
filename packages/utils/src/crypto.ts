//@ts-ignore
import MD5 from 'crypto-js/md5';

export function md5(content: string) {
  return String(MD5(content));
}
