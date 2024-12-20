import { kv } from "@vercel/kv"

export default async function handler(req, res) {
  if(!apiKey || apiKey != process.env.API_KEY){res.status(418).send('you have not authenticated :('); return}

  let count = 0

  for await (const key of kv.scanIterator()) {
    count++
  }

  // Return the results
  res.status(200).json(count)

}
