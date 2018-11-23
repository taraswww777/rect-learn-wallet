import * as React from 'react';
import styled from "styled-components";

interface InterfaceMessage {
	type: string;
	children: any;
}

interface InterfaceBlockMessage {
	type: string;
}

const BlockMessage = styled.div<InterfaceBlockMessage>`
	background: ${props =>
	props.type === 'success' ? '#0f0' :
		props.type === 'danger' ? '#f00' :
			props.type === 'info' ? '#00f' :
				props.type === 'warning' ? '#ff0' :
					'#0ff'};
	color: ${props =>
	props.type === 'success' ? '#fff' :
		props.type === 'danger' ? '#fff' :
			props.type === 'info' ? '#fff' :
				props.type === 'warning' ? '#000' :
					'#000'};
	
	width: 100%;
	font-weight: bold;
	padding: 5px 10px;
	margin: 5px;
`;

function Message(props: InterfaceMessage) {
	return <BlockMessage type={props.type}>{props.children}</BlockMessage>
}

export default Message;
