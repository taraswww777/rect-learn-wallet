import * as React from 'react';
import bem, {InterfaceBEMProps} from "../../bem";
import './Message.css';

export const MESS_TYPE_SUCCESS = 'success';
export const MESS_TYPE_DANGER = 'danger';
export const MESS_TYPE_INFO = 'info';
export const MESS_TYPE_WARNING = 'warning';

export interface InterfaceMessage extends InterfaceBEMProps {
	type?: string;
	children: any;
}


function Message(props: InterfaceMessage) {
	return <div className={props.bemBlock('type', props.type || MESS_TYPE_SUCCESS)}>
		{props.children}
	</div>;
}

export default bem(Message, 'message');
