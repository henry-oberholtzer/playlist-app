export const handleFieldObjectChange = (state) => {
    return (setStateFunction) => {
        return (event) => {
            setStateFunction({...state, [event.target.name]: event.target.value})
        }
    }
}