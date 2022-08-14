import { json } from '@remix-run/node'
import bcrypt from 'bcryptjs'
import { prisma } from '~/db.server'
import type { RegisterForm } from '~/types/forms'

export const createUser = async (user: RegisterForm) => {
	const passwordHash = await bcrypt.hash(user.password, 10)

	const newUser = await prisma.user.create({
		data: {
			email: user.email,
			password: passwordHash,
			name: user.name,
		},
	})

	return { id: newUser.id, email: user.email }
}

export async function register(user: RegisterForm) {
	const exists = await prisma.user.count({ where: { email: user.email } })
	if (exists) {
		return json(
			{ error: `User already exists with that email` },
			{ status: 400 }
		)
	}

	const newUser = await createUser(user)
	if (!newUser) {
		return json(
			{
				error: `Something went wrong trying to create a new user.`,
				fields: { email: user.email, password: user.password },
			},
			{ status: 400 }
		)
	}

	return newUser
}
