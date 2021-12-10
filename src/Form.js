import { useState} from 'react'

function Form(props) {
    const [newBounty, setNewBounty] = useState({
        name: '',
        wantedFor: '',
        client: '',
        reward: 100000,
        captured: false,
        lastSeen: ''
    })

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
            captured: Boolean(newBounty.captured),
            lastSeen: newBounty.lastSeen
        }
        fetch('http://localhost:8000/bounties', {
            method: 'POST',
            body: JSON.stringify(preJSONBody),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(postedBounty => {
            props.refreshBounties()
            setNewBounty({
                name: '',
                wantedFor: '',
                client: '',
                reward: 100000,
                captured: false,
                lastSeen: ''
            })
        })
        .catch(err => {
            console.table(err)
        })
    }

    return (
        <form onSubmit={postBounty}>
            <div>
                <label htmlFor='name'>Name: </label>
                <input id='name' type='text' name='name' 
                    onChange={handleChange} value={newBounty.name}
                />
            </div>
            <div>
                <label htmlFor='wantedFor'>Wanted For: </label>
                <input id='wantedFor' type='text' name='wantedFor' 
                    onChange={handleChange} value={newBounty.wantedFor}
                />
            </div>
            <div>
                <label htmlFor='client'>Client: </label>
                <input id='client' type='text' name='client' 
                    onChange={handleChange} value={newBounty.client}
                />
            </div>
            <div>
                <label htmlFor='reward'>Reward: </label>
                <input id='reward' type='number' name='reward' 
                    onChange={handleChange} value={newBounty.reward}
                />
            </div>
            <div>
                <label htmlFor='lastSeen'>Last Seen: </label>
                <input id='lastSeen' type='text' name='lastSeen' 
                    onChange={handleChange} value={newBounty.lastSeen}
                />
            </div>
            <div>
                <label htmlFor='captured'>Captured: </label>
                <input id='captured' type='checkbox' name='captured' 
                    onChange={handleCheck} checked={newBounty.captured ? 'checked' : ''}
                />
            </div>

            <input type='submit' value='Post Bounty' />
        </form>
    )
}

export default Form