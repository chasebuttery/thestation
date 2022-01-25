import React, { useState, useEffect } from 'react';
import './User.scss'

export default function User(props) {
	const { user } = props;


	return(
		<div className = "User">
			<h1 className = "UserName">{user?.name || 'USERS'}</h1>
		</div>
	)

}
