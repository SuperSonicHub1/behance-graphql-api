# behance-graphql-api

Yet another company who doesn't know how to secure their GraphQL API gets pwnd.
[I am hosting docs for this.](https://kawcco.com/behance-graphql-api/index.html)

## Usage
The URL of the API is `https://www.behance.net/v3/graphql`.
You'll need these headers to access it:
```js
const bcp = crypto.randomUUID() 
const headers = new Headers({
	// `BCP` is simply a valid UUID.
	'Content-Type': 'application/json',
	'X-BCP': bcp,
	'X-Requested-With': 'XMLHttpRequest',
	'Cookie': `bcp=${bcp}`,
})
```

## Updates
If the schema's out of date, clone this repo, `npm i && npm run build`, and send a pull request.
Also feel free to shoot me an issue.
