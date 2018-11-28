import * as React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";

const ElLeftBar = styled.div`
	display: flex;
	flex-wrap: wrap;
`;
const ElLeftBarItem = styled.div`
	width: 100%;
	margin: 5px 0;
	
	&:first-child{
		margin-top: 0;
	}
	
	&:first-child{
		margin-bottom: 0;
	}
`;
const ElLeftBarLink = styled(Link)`
	padding: 5px;
	width: 100%;
	display: inline-block;
	text-transform: uppercase;
	text-decoration: none;
	color: #fff;
	
	&:hover{
		text-decoration: underline;
	}
`;

function LeftBar() {
	return (
		<ElLeftBar>
			<ElLeftBarItem><ElLeftBarLink to={'/'}>Home</ElLeftBarLink></ElLeftBarItem>
			<ElLeftBarItem><ElLeftBarLink to={'/admin/categories'}>Cat</ElLeftBarLink></ElLeftBarItem>
			<ElLeftBarItem><ElLeftBarLink to={'/admin/accounts'}>Accounts</ElLeftBarLink></ElLeftBarItem>
		</ElLeftBar>
	);
}

export default LeftBar;

