import * as _ from 'lodash';
import {TypeDispatch} from "../types/InterfaceAction";

export default function dispatchCombine(dispatchers: any[]) {
	return (dispatch: TypeDispatch) => {
		const dispatchersMerged = {};
		_.map(dispatchers, dispatcherItem => {
			if (dispatcherItem.name) {
				dispatchersMerged[dispatcherItem.name] = dispatcherItem(dispatch)
			} else {
				console.error('dispatcherItem not have name ', dispatcherItem)
			}
		});
		return dispatchersMerged;
	};
}
