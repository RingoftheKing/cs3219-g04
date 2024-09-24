import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

function UpdateQn() {
  const {id} = useParams()
  //console.log(id)

  const [question_cat, setCategory] = useState([])
  const [question_complex, setComplexity] = useState('')
  const [question_desc, setDescription] = useState('')
  const [question_id, setID] = useState('')
  const [question_title, setTitle] = useState('')
  const navigate = useNavigate()

  // update the question 
  useEffect(() => {
    // console.log("Fetching question with ID:", id);
    // get the result 
    axios.get('http://localhost:3001/getQuestion/' + id)
    .then(result => {
        console.log(result)
        setCategory(result.data.question_cat)
        setComplexity(result.data.question_complex)
        setDescription(result.data.question_desc)
        setID(result.data.question_id)
        setTitle(result.data.question_title)
    })
    .catch(err => console.log(err))
  }, [])

  const Update = (e) => {
    e.preventDefault()
    axios.put("http://localhost:3001/updateQuestion/" + id, {question_cat, question_complex, question_desc, question_id, question_title})
    .then(result => {
        console.log(result)
        navigate('/')
      } 
    )
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className="w-50 bg-white rounded p-3">
            <form onSubmit={Update}>
                <h2>Update Question</h2>
                <div className="mb-2">
                    <label htmlFor="">Category</label>
                    <input type="text" placeholder='Data Structures' className='form-control'
                    value={question_cat.join(", ")} onChange={(e) => setCategory(e.target.value.split(","))}/>
                </div>
                <div className="container mt-3">
                    <h3>Complexity</h3>
                    <div className="form-check">
                        <input type="radio" id="easy" value="Easy" checked={question_complex === "Easy"} onChange={(e) => setComplexity(e.target.value)}/>
                        <label className="form-check-label" htmlFor="easy">Easy</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" id="medium" value="Medium" checked={question_complex === "Medium"} onChange={(e) => setComplexity(e.target.value)}/>
                        <label className="form-check-label" htmlFor="medium">Medium</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" id="hard" value="Hard" checked={question_complex === "Hard"} onChange={(e) => setComplexity(e.target.value)}/>
                        <label className="form-check-label" htmlFor="hard">Hard</label>
                    </div>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Description</label>
                    <input type="text" placeholder='Return the largest....' className='form-control'
                    value={question_desc} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">ID</label>
                    <input type="text" placeholder='21' className='form-control'
                    value={question_id} onChange={e => setID(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Title</label>
                    <input type="text" placeholder='Shortest Distance' className='form-control'
                    value={question_title} onChange={e => setTitle(e.target.value)}/>
                </div>
                <button className="btn btn-success">Update</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateQn