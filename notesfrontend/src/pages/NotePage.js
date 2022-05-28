import React, {useState, useEffect} from 'react'



const NotePage = ( { match,history} ) => {

	let noteId = match.params.id
	let [note, setNote] = useState(null)


	useEffect (() =>{
		getNote()
		//eslint-disable-next-line
	}, [noteId]) 

	let getNote = async ()=> {
		if (noteId==='new') return
		let response = await fetch(`/api/notes/${noteId}`)
		let data = await response.json()
		setNote(data)
	}

	let createNote = async () => {
		fetch(`/api/notes/create/`, {
			method : "POST",
			headers : {
				'content-type': 'application/json'
			},
			body:JSON.stringify(note),
		})
		//history.push('/')
	}



	let updateNote = async () => {
		fetch(`/api/notes/${noteId}/update/`, {
			method : "PUT",
			headers : {
				'content-type': 'application/json'
			},
			body:JSON.stringify(note),
		})
		history.push('/')
	}

	let deleteNote = async () => {
		fetch(`/api/notes/${noteId}/delete/`, {
			method : "DELETE",
			headers : {
				'content-type': 'application/json'
			},
		})
	}

	let handleSubmit = () => {
		if (noteId !== 'new' && note.body===''){
			deleteNote()
		}else if (noteId !== 'new'){
			updateNote()
		}else if(noteId==='new' && note.body!== null){
			createNote()
		}
		
		history.push('/')

	}

	let handleChange = (value) => {
		setNote(note =>({...note, 'body':value}))
		console.log('Handle Change:', note)
	}

	return (
		<div>
			<div>	
				<button onClick={handleSubmit}>back</button>
			</div>
			<div>
			{noteId !== 'new' ? (
					<button onClick={deleteNote}>remove</button>
				) : (
					<button onClick = {handleSubmit}>Done</button>
				)}
				
			
			</div>

			<div>
				<textarea onChange={(e)=> {handleChange(e.target.value)}} defaultValue={note?.body}></textarea>
			</div>

		</div>

		)
}

export default NotePage