import React, { useState, useEffect } from 'react';
import './UsersList.scss';
import User from './User'
import RocketIcon from '../../Images/Rocket/rocket32p.png'

export default function Users(props) {
	const { users } = props;

	//console.log(users)
	

	return(
		<div className = "Users">
			{users.map(user => {
				return <User key = {user.id} user={user} />
			})}
			<img className='Rocket' src={RocketIcon} />
		</div>
	)

	// return (
	// 		<div className = "UsersList">
	// 		{users.map(user => {
	// 			return(
	// 				<User user = {user} />
	// 			)
	// 		})}
	// 		</div>
	// 		)
}
