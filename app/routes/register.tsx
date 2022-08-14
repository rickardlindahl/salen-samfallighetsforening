import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { Container } from '~/routes/index'
import { authenticator } from '~/services/auth.server'
import { createUser } from '~/services/user.server'
import type { RegisterForm } from '~/types/forms'

export let loader: LoaderFunction = async ({ request }) => {
	await authenticator.isAuthenticated(request, { successRedirect: '/app' })

	return json({ foo: 'bar' })
}

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData()
	const registerForm: RegisterForm = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
		name: formData.get('name') as string,
	}
	const user = await createUser(registerForm)

	return json({
		success: true,
		user,
	})
}

export default function () {
	return (
		<Container>
			<Form action='/register' method='post'>
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
								Register a new account.
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
							<label htmlFor='name'>Name</label>
							<input
								className='h-12 w-full rounded-md border border-gray-300 bg-transparent p-4 text-white outline-none focus:border-gray-300 focus:bg-transparent active:border-gray-300 active:bg-transparent'
								id='name'
								type='text'
								name='name'
								required
							/>
						</div>
						<div className='w-full space-y-2'>
							<label htmlFor='password'>Password</label>
							<input
								className='h-12 w-full rounded-md border border-gray-300 bg-transparent p-4 text-white outline-none focus:border-gray-300 focus:bg-transparent active:border-gray-300 active:bg-transparent'
								id='password'
								type='password'
								name='password'
								required
							/>
						</div>
						<button className='flex h-12 w-full items-center justify-center rounded-md bg-brand-500'>
							Create
						</button>
					</div>
				</div>
			</Form>
		</Container>
	)
}
