import * as React from 'react';
import {Link} from "react-router-dom";

function LeftBar() {
	return (
		<ol>
			<li><Link to={'/admin/categories'}>Categories</Link></li>
		</ol>
	);
}

export default LeftBar;

