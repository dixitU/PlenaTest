import client from '../utils/client';

export async function getAllProducts() {
  const {data} = await client.get<any>('/products');
  return data;
}
