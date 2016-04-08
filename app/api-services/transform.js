export function transform(response, expects) {
  const json = JSON.parse(response)
  const result = json.result

  if (!result) {
    throw new Error('Response does not conform to v3 specification')
  }

  if (result.status < 200 || result.status >= 300) {
    throw new Error(result.content)
  }

  return result.content
}