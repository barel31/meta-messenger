import type { NextApiRequest, NextApiResponse } from 'next';
import type { Message } from '../../typings';
import redis from '../../redis';

type Data = {
	messages: Message[];
};

type errorData = {
	body: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | errorData>) {
	if (req.method != 'GET') {
		res.status(405).json({ body: 'Method Not Allowed' });
		return;
	}

	const messagesRes = await redis.hvals('messages');
	
	const messages: Message[] = messagesRes
	.map((message) => JSON.parse(message))
	.sort((a, b) => b.created_at - a.created_at);

	res.status(200).json({ messages });
}
