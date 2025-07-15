export const getGitBooks = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_GITBOOK_API_URL}/orgs/kifMTP6TFy9ESbb7IqUE/spaces`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITBOOK_ACCESS_TOKEN}`,
    },
  })

  const data = await response.json()

  return data.items
}
