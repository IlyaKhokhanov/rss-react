export async function request<T>(
  url: string,
  options: object = {},
): Promise<T | string> {
  const response = await fetch(url, options);
  if (response.status === 500) {
    return response.text();
  }
  return response.json();
}
