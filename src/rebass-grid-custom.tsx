// @ts-ignore
import {Box, Flex} from "@rebass/grid";
// @ts-ignore
import React from 'react';

export const settings = {
	colors: {
		red: '#e50914'
	}
};

export const Container = (props?: any) =>
	<Box
		{...props}
		mx='auto'
		px={2}
		css={{
			maxWidth: '1024px',
		}}
	/>;

export const Row = (props?: any) => (
	<Flex
		{...props}
		mx={-2}
		css={{
			'flex-wrap': 'wrap'
		}}
	/>
);

export const Ceil = (props?: any) => (
	<Box
		{...props}
		px={2}
	/>
);


export function isKeyEnter(event: any) {
	return event.key.toLowerCase() === 'enter';
}
