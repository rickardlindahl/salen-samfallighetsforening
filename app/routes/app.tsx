import { Outlet, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import type { User } from '~/models/user.server'
import { authenticator } from '~/services/auth.server'

export let loader: LoaderFunction = async ({ request }) => {
	// If the user is here, it's already authenticated, if not redirect them to
	// the login page.
	const user = await authenticator.isAuthenticated(request, {
		failureRedirect: '/login',
	})

	return json({ user })
}

export default function App() {
	const { user } = useLoaderData<{ user: User }>()

	return (
		<main className='flex h-full w-full flex-col items-center justify-start'>
			<div>Logged in as {user.name}</div>
			<Outlet />
		</main>
	)
}
