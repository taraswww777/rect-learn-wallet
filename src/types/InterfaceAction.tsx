export interface InterfaceAction {
	type: string;
	payload?: any;
}

export type TypeDispatch = (
	action: InterfaceAction
) => void;
