import { getProviders } from 'next-auth/react';
import Image from 'next/image';
import SignInComponent from '../../../components/SignInComponent';

export default async function SignInPage() {
	const providers = await getProviders();

	return (
		<div className="grid justify-center">
			<div>
				<Image
					className="rounded-full mx-2 object-cover"
					width={700}
					height={700}
					src="assets/logo.png"
					alt="Profile Picture"
				/>
			</div>

			<SignInComponent providers={providers} />
		</div>
	);
}
