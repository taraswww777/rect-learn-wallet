import * as _ from 'lodash';
import * as React from 'react';
import styled from "styled-components";

export const MESS_TYPE_DANGER = 'danger';
export const MESS_TYPE_INFO = 'info';
export const MESS_TYPE_SUCCESS = 'success';
export const MESS_TYPE_WARNING = 'warning';

const settingsBg = {};
settingsBg[MESS_TYPE_DANGER] = '#f00';
settingsBg[MESS_TYPE_INFO] = '#00f';
settingsBg[MESS_TYPE_SUCCESS] = '#0f0';
settingsBg[MESS_TYPE_WARNING] = '#ff0';

const settingsColor = {};
settingsColor[MESS_TYPE_DANGER] = '#fff';
settingsColor[MESS_TYPE_INFO] = '#fff';
settingsColor[MESS_TYPE_SUCCESS] = '#fff';
settingsColor[MESS_TYPE_WARNING] = '#000';


const ElMessageBase = styled.div`
	width: 100%;
	font-weight: bold;
	padding: 5px 10px;
	margin: 5px 0;
`;

const ElMessage = styled(ElMessageBase)((props: { type: string }) => ({
	background: settingsBg[props.type],
	color: settingsColor[props.type],
}));


export interface InterfaceMessage {
	type?: string;
	children: any;
}


function Message(props: InterfaceMessage) {

	return <ElMessage
		className="ElMessage"
		type={_.defaultTo(props.type, MESS_TYPE_SUCCESS)}
	>{props.children}</ElMessage>;
}

export default Message;
