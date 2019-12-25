import React from 'react';
const Checkbox = props => {
    const { chkId, chkDefault, initHandleCheckboxEvent } = props;
    const initHandleChange = event => {
        let obj = {
            type: event.target.id === 'chkAll' ? 'addAll' : 'addItem',
            value: event.target.id
        }
        if(!event.target.checked){
            obj = {
                type: event.target.id === 'chkAll' ? 'removeAll' : 'removeItem',
                value: event.target.id
            }
        }
        initHandleCheckboxEvent(obj);
    }
    return (
        <div className="checkboxGroup">
            <input className="inp-cbx" onChange={ initHandleChange } id={chkId} checked={chkDefault} type="checkbox" style={{display: 'none'}}/>
            <label className="cbx" htmlFor={chkId}>
                <span>
                    <svg width="12px" height="10px" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg>
                </span>
            </label>
        </div>
    )
}
export default Checkbox;