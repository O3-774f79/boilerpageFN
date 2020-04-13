import React from 'react'
const styles = {
    dd: {
        width: 200
    }
}

const Drowdow = props => {
    const { data, value } = props
    const changeHandler = (e) => {
        props.onChange(e.target.value);
    }
    return (
        <React.Fragment>
            <select style={styles.dd} value={value} onChange={(e) => changeHandler(e)}>
                {data.map(item =>
                    <option value={item.id}>{item.label}</option>
                )}
            </select>
        </React.Fragment>

    )
}
export default Drowdow