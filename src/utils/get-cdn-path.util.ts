export default function getCDNPath(path: string) {
  return process.env.NEXT_PUBLIC_CDN_URL + path;
}
