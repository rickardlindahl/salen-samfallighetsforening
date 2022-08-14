import bcrypt from 'bcryptjs'
import { Authenticator, AuthorizationError } from 'remix-auth'
import { EmailLinkStrategy } from 'remix-auth-email-link'
import { FormStrategy } from 'remix-auth-form'
import { prisma } from '~/db.server'
import type { User } from '~/models/user.server'
import { createUser, getUserByEmail } from '~/models/user.server'
import sendEmail from '~/services/email.server'
import { sessionStorage } from '~/services/session.server'

const MAGIC_LINK_SECRET = process.env.MAGIC_LINK_SECRET

if (!MAGIC_LINK_SECRET)
	throw new Error('Missing MAGIC_LINK_SECRET environment variable')

export const authenticator = new Authenticator<User>(sessionStorage)

authenticator.use(
	new FormStrategy(async ({ form, context }) => {
		// Here you can use `form` to access and input values from the form.
		// and also use `context` to access more things from the server
		let email = form.get('email') as string
		let password = form.get('password') as string

		// You can validate the inputs however you want
		// invariant(typeof username === 'string', 'username must be a string')
		// invariant(username.length > 0, 'username must not be empty')

		// invariant(typeof password === 'string', 'password must be a string')
		// invariant(password.length > 0, 'password must not be empty')

		const user = await prisma.user.findUnique({
			where: { email },
		})

		if (!user)
			throw new AuthorizationError(
				'A user with that email does not exist'
			)

		const isCorrectPassword = await bcrypt.compare(password, user.password)
		if (!isCorrectPassword) {
			throw new AuthorizationError('Invalid credentials')
		}

		return user
	})
)

authenticator.use(
	// @ts-ignore
	new EmailLinkStrategy(
		{
			sendEmail,
			secret: MAGIC_LINK_SECRET,
			callbackURL: '/verify',
			validateSessionMagicLink: true,
		},
		async ({
			email,
			form,
			magicLinkVerify,
		}: {
			email: string
			form: FormData
			magicLinkVerify: boolean
		}) => {
			let user = await getUserByEmail(email)
			if (user) {
				return user
			} else {
				const newUser = await createUser({ email })
				return newUser
			}
		}
	)
)
