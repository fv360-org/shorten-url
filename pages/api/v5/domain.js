export default async function handler(req, res) {
  if(!apiKey || apiKey != process.env.API_KEY){res.status(418).send('you have not authenticated :('); return}
  const { add } = req.query

  const response = await fetch(
    `https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains?teamId=${process.env.TEAM_ID_VERCEL}`,
    {
      body: `{\n  "name": "${add.replaceAll('http://','').replaceAll('https://','')}"\n}`,
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  )

  const data = await response.json()

  if (data.error?.code == 'forbidden') {
    res.status(403).end()
  } else if (data.error?.code == 'domain_taken') {
    res.status(409).end()
  } else {
    res.status(200).end()
  }
}