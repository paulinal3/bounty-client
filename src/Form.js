import { useState} from 'react'

function Form() {
    const [newBounty, setNewBounty] = useState({})

    const handleChange = (e) => {
        setNewBounty({...newBounty, [e.target.name]: e.target.value})
    }

    const handleCheck = (e) => {
        setNewBounty({...newBounty, [e.target.name]: e.target.checked})
    }

    const postBounty = (e) => {
        e.preventDefault()
        let preJSONBody = {
            name: newBounty.name,
            wantedFor: newBounty.wantedFor,
            client: newBounty.client,
            reward: Number(newBounty.reward),
            captured: Boolean(newBounty.captured)
        }
        fetch('http://localhost:8000/bouties', {
            method: 'POST',
            body: JSON.stringify(preJSONBody),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(postedBounty => {
            setNewBounty({})
        })
        .catch(err => {
            console.table(err)
        })
    }

    return (
        <form onSubmit={postBounty}>
            <div>
                <label htmlFor='name'>Name: </label>
                <input id='name' type='text' name='name' onChange={handleChange} />
            </div>
            <div>
                <label htmlFor='wantedFor'>Wanted For: </label>
                <input id='wantedFor' type='text' name='wantedFor' onChange={handleChange} />
            </div>
            <div>
                <label htmlFor='client'>Client: </label>
                <input id='client' type='text' name='client' onChange={handleChange} />
            </div>
            <div>
                <label htmlFor='reward'>Reward: </label>
                <input id='reward' type='number' name='reward' onChange={handleChange} />
            </div>
            <div>
                <label htmlFor='captured'>Captured: </label>
                <input id='captured' type='checkbox' name='captured' onChange={handleCheck} />
            </div>

            <input type='submit' value='Post Bounty' />
        </form>
    )
}

export default Form