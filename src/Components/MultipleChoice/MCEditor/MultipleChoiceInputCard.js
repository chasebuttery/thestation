import React, {useState} from 'react'
import './MultipleChoiceInputCard.scss'

const QuestionForm = (props) =>{
    const {data, updateData} = props
    const [num, setNum] = useState();
    const [numOptions, setNumOptions] = useState([0,1,10,100])

    function field (id){
        return  <input className = "OptionInput" type="text" id={id} value={data[id]} onChange={e => {updateData(id, e.currentTarget.value )}} />
    }
    function checkbox (id){
        return <input type="checkbox" checked={data[id]} onChange={e => { updateData(id, e.currentTarget.checked) }} />
    }
    function answerField (id){
        return(
            <div className="Answer">
                <div>
                <label>{id}</label>
                <label className="check">
                    {checkbox(id + 'ans')}
                </label>
                </div>
                <div className="AnswerField">
                    {field(id)}
                </div>
            </div>
        )
    }
    
    return (
        <div className="MultipleChoiceInputCard">
            <form className = "MCForm">
                <div className="Question">
                    <div className="field">
                        <label htmlFor="question">Question</label>
                        <input type="text" id='question' value={data['question']} onChange={e => {updateData('question', e.currentTarget.value )}} />
                    </div>
                </div>
                <div className="Options">
                    <div className="Red">
                        {answerField('A')}
                    </div>
                    <div className="Blue">
                        {answerField('B')}
                    </div>
                    <div className="Yellow">
                        {answerField('C')}
                    </div>
                    <div className="Green">
                        {answerField('D')}
                    </div>

                    <div className = "Points">
                <label className="Label">Point Value</label>
                        <select className = "Select" onChange = {e => {updateData('points', e.currentTarget.value )}} value = {data['points']}>
                            {numOptions.map((num) => {
                                return ( 
                                <option value = {num} key = {num}>
                                    {num}
                                </option>
                                );
                            })
                            }
                            </select>
                    </div>

                    <div className = "Time">
                <label className="Label">Sec To Answer</label>
                        <select className = "Select" onChange = {e => {updateData('time', e.currentTarget.value )}} value = {data['time']}>
                            {numOptions.map((num) => {
                                return ( 
                                <option value = {num} key = {num}>
                                    {num}
                                </option>
                                );
                            })
                            }
                            </select>
                    </div>
                    </div>
            </form>
        </div>
    )
}

export default QuestionForm