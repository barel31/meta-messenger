export { default } from 'next-auth/middleware';

// Sucures the matching routes...
export const config = {
	matcher: ['/'],
	runtime: 'experimental-edge', // for Edge API Routes only
	unstable_allowDynamic: [
		'/lib/utilities.js', // allows a single file
		'/node_modules/function-bind/**', // use a glob to allow anything in the function-bind 3rd party module
	],
};
