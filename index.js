// https://github.com/prisma-labs/get-graphql-schema/blob/master/src/index.ts
// https://github.com/autotelic/graphql-schema-tools

import { webcrypto as crypto } from "crypto"
import { writeFile } from "fs/promises"
import graphql from "graphql"
import tools from '@autotelic/graphql-schema-tools'
const { getIntrospectionQuery, buildClientSchema, printSchema } = graphql
const { normalizeGQLSource } = tools

const ENDPOINT = 'https://www.behance.net/v3/graphql'

const bcp = crypto.randomUUID() 
const res = await fetch(
		ENDPOINT,
		{
			method: 'POST',
			headers: new Headers({
				// These are the four headers required to access the API.
				// `BCP` is simply a valid UUID.
				'Content-Type': 'application/json',
				'X-BCP': bcp,
				'X-Requested-With': 'XMLHttpRequest',
				'Cookie': `bcp=${bcp}`,
			}),
			body: JSON.stringify({ query: getIntrospectionQuery() })
		}
	),
	body = await res.json()

const introspection = body.data
const clientSchema = buildClientSchema(introspection)
const unnormalizedSchema = printSchema(clientSchema)
const { source } = normalizeGQLSource(unnormalizedSchema)

await writeFile('schema.json', JSON.stringify(introspection, null, '\t'), { encoding: 'utf-8' })
await writeFile('schema.graphql', source, { encoding: 'utf-8' })
