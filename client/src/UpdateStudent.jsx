import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"

function UpdateStudent () {
    const {id} = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [course, setCourse] = useState('')
    const [age, setAge] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3001/getStudent/"+id)
        .then(result => {console.log(result)
            const data = result.data;
            setName(data.name || '')
            setEmail(data.email || '')
            setCourse(data.course || '')
            setAge(data.age || '')
        })
        .catch(err => console.log(err))
    }, [])

    const Save = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3001/updateStudent/"+id, {name, email, course, age})
        .then(result => {
            console.log(result)
            navigate("/")
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Save}>
                    <h2>Edit Student</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control"
                        value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="Enter Email" className="form-control"
                        value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Course</label>
                        <input type="text" placeholder="Enter Course" className="form-control"
                        value={course} onChange={(e) => setCourse(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input type="text" placeholder="Enter Age" className="form-control"
                        value={age} onChange={(e) => setAge(e.target.value)}/>
                    </div>
                    <button className="btn btn-success">Save</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateStudent;