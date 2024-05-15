import { getProviders } from 'next-auth/react';
import Image from 'next/image';
import SignInComponent from '../../../components/SignInComponent';

async function SignInPage() {
	const providers = await getProviders();

	return (
		<div className="grid justify-center">
			<div>
				<Image
					className="rounded-full mx-2 object-cover w-auto m-8"
					width={300}
					height={300}
					priority
					src="/assets/logo.png"
					alt="Profile Picture"
				/>
			</div>

			<SignInComponent providers={providers} />
		</div>
	);
}

export default SignInPage;
