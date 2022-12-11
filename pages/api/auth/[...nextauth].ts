import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';

export const authOptions = {
	providers: [
		FacebookProvider({
			clientId: process.env.FACEBOOK_ID!,
			clientSecret: process.env.FACEBOOK_SECRET!,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET!,
	pages: {
		signIn: '/auth/signin',
	},
};

export default NextAuth(authOptions);
