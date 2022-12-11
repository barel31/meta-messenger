import type { NextApiRequest, NextApiResponse } from 'next';
import type { Message } from '../../typings';
import redis from '../../redis';
import { serverPusher } from '../../pusher';

type Data = {
	message: Message;
};

type errorData = {
	body: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | errorData>) {
	if (req.method != 'POST') {
		res.status(405).json({ body: 'Method Not Allowed' });
		return;
	}

	const { message } = req.body;

	const newMessage = {
		...message,
		// Reaplace the timestamp of the user to the timestamp of the server
		created_at: Date.now(),
	};

	// Push to upstash redis db
	await redis.hset('messages', message.id, JSON.stringify(newMessage));
	serverPusher.trigger('messages', 'new-message', newMessage);

	res.status(200).json({ message: newMessage });
}
