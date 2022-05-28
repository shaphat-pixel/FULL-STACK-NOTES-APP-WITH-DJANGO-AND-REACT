import React from 'react'
import {Link} from 'react-router-dom'



const AddButton = () => {
	return (

		<Link to="/note/new">
			<button>create</button>
		</Link>

		)
}

export default AddButton