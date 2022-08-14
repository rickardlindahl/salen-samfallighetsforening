import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { Container } from '~/routes/index'
import { authenticator } from '~/services/auth.server'
import { sessionStorage } from '~/services/session.server'

export let loader: LoaderFunction = async ({ request }) => {
	await authenticator.isAuthenticated(request, { successRedirect: '/app' })
	let session = await sessionStorage.getSession(request.headers.get('Cookie'))
	// This session key `auth:magiclink` is the default one used by the EmailLinkStrategy
	// you can customize it passing a `sessionMagicLinkKey` when creating an
	// instance.
	if (session.has('auth:magiclink')) return json({ magicLinkSent: true })

	return json({ magicLinkSent: false })
}

export const action: ActionFunction = async ({ request }) => {
	await authenticator.authenticate('form', request, {
		successRedirect: '/app',
		failureRedirect: '/login',
	})
}

export default function () {
	let { magicLinkSent } = useLoaderData<{ magicLinkSent: boolean }>()

	return (
		<Container>
			<Form action='/login' method='post'>
				<div className='flex flex-col items-center justify-center'>
					<div className='mb-8 flex flex-col items-center justify-center space-y-8'>
						<img
							className='w-48'
							src='/images/logoipsum.svg'
							alt='Logo'
						/>
						<div className='flex flex-col items-center justify-center space-y-4'>
							<h1 className='text-3xl font-bold'>Sign In</h1>
							<p className='text-lg font-semibold'>
								Sign in with an existing account
							</p>
						</div>
					</div>
					<div className='flex w-96 flex-col items-center justify-center space-y-4'>
						<div className='w-full space-y-2'>
							<label htmlFor='email'>Email address</label>
							<input
								className='h-12 w-full rounded-md border border-gray-300 bg-transparent p-4 text-white outline-none focus:border-gray-300 focus:bg-transparent active:border-gray-300 active:bg-transparent'
								id='email'
								type='email'
								name='email'
								required
							/>
						</div>
						<div className='w-full space-y-2'>
							<label htmlFor='password'>password</label>
							<input
								className='h-12 w-full rounded-md border border-gray-300 bg-transparent p-4 text-white outline-none focus:border-gray-300 focus:bg-transparent active:border-gray-300 active:bg-transparent'
								id='password'
								type='password'
								name='password'
								required
							/>
						</div>
						<button className='flex h-12 w-full items-center justify-center rounded-md bg-brand-500'>
							Sign In
						</button>
					</div>
					{magicLinkSent && (
						<div className='my-4 w-96 text-center'>
							<p>
								A sign in link has been sent to your email
								address.
							</p>
						</div>
					)}
				</div>
			</Form>
			<div className='before:relative before:w-1/2 before:border-t before:border-gray-300 before:content-[""] after:relative after:w-1/2 after:border-t after:border-gray-300 after:content-[""]'>
				<span className='mx-4 text-lg'>or</span>
			</div>
		</Container>
	)
}
