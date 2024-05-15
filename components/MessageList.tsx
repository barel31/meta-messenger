'use client';

import { useEffect, useRef } from 'react';
import useSWR from 'swr';
import fetcher from '../utils/fetchMessages';
import { Message } from '../typings';
import MessageComponent from './MessageComponent';
import { clientPusher } from '../pusher';

type Props = {
	initialMessages: Message[];
};

export default function MessageList({ initialMessages }: Props) {
	const {
		data: messages,
		error,
		mutate,
	} = useSWR<Message[]>('/api/getMessages', fetcher);
	const ref = useRef<HTMLDivElement>(null);

	// Scroll to bottom when new message received
	useEffect(() => {
		if (ref.current) {
			const offsetBottom =
				ref.current.offsetTop + ref.current.offsetHeight;
			window.scrollTo({ top: offsetBottom });
		}
	}, [ref.current]);
	useEffect(() => {
		if (ref.current) {
			if (
				window.innerHeight + window.scrollY >=
				document.body.offsetHeight - 150
			) {
				const offsetBottom =
					ref.current.offsetTop + ref.current.offsetHeight;
				window.scrollTo({ top: offsetBottom, behavior: 'smooth' });
			}
		}
	}, [messages]);

	useEffect(() => {
		const channel = clientPusher.subscribe('messages');

		channel.bind('new-message', async (data: Message) => {
			if (messages?.find((message) => message.id === data.id)) return;

			if (!messages) {
				mutate(fetcher);
			} else {
				mutate(fetcher, {
					optimisticData: [data, ...messages!],
					rollbackOnError: true,
				});
			}
		});
	}, [messages, mutate, clientPusher]);

	return (
		<div
			className="px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto flex flex-col-reverse gap-3"
			ref={ref}>
			{(messages || initialMessages).map((message) => (
				<MessageComponent key={message.id} message={message} />
			))}
		</div>
	);
}
