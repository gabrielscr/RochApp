function validateEventTarget(event) {
    if (!event)
        throw 'Event can not be empty';
    if (!event.target)
        throw 'Event target can not be null';
    // ToDo: testar pois não está disparando a exceção
    if (!event.target.name)
        throw 'The input name attribute can not be empty';
}
function getValue(event) {
    let target = event.target;
    if (target.type === 'checkbox' || target.tagName === "ION-CHECKBOX" || target.tagName === "ION-TOGGLE")
        return target.checked;
    else if (target.value === null || target.value === undefined)
        return null;
    return target.value;
}
function getField(event) {
    return event.target.name;
}
export function handleChange(event, source, sourceField) {
    validateEventTarget(event);
    let value = getValue(event);
    let field = getField(event);
    if (sourceField)
        source[sourceField] = Object.assign({}, (source[sourceField] || {}), { [field]: value });
    else
        source[field] = value;
}
export function handleChangeFactory(source, sourceField) {
    return (e) => {
        handleChange(e, source, sourceField);
    };
}
