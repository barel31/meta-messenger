import Pusher from 'pusher';
import ClientPusher from 'pusher-js';


// env keys don't work for some reason

export const serverPusher = new Pusher({
	appId: '1521034',
	key: 'f8a0eb6bc757d5b34aab',
	secret: '667c52b41ed3135d77a2',
	cluster: 'eu',
	useTLS: true,
	// appId: process.env.PUSHER_APP_ID!,
	// key: process.env.PUSHER_KEY!,
	// secret: process.env.PUSHER_SECRET!,
	// cluster: process.env.PUSHER_CLUSTER!,
	// useTLS: true,
});

export const clientPusher = new ClientPusher('f8a0eb6bc757d5b34aab', {
	cluster: 'eu',
	forceTLS: true,
});

// export const clientPusher = new ClientPusher('f8a0eb6bc757d5b34aab', {
// 	cluster: process.env.PUSHER_CLUSTER!,
// 	forceTLS: true,
// });
