function validateEventTarget(event: Event) {
    if (!event)
        throw 'Event can not be empty';

    if (!event.target)
        throw 'Event target can not be null';

    // ToDo: testar pois não está disparando a exceção
    if (!(event.target as any).name)
        throw 'The input name attribute can not be empty';
}

function getValue(event: Event) {
    let target = event.target as any;

    if (target.type === 'checkbox' || target.tagName === "ION-CHECKBOX" || target.tagName === "ION-TOGGLE")
        return target.checked;
    else if (target.value === null || target.value === undefined)
        return null;

    return target.value;
}

function getField(event: Event) {
    return (event.target as any).name;
}

export function handleChange<T, K extends keyof T>(event: Event, source: T, sourceField?: K) {
    validateEventTarget(event);

    let value = getValue(event);
    let field = getField(event);

    if (sourceField)
        source[sourceField] = {
            ...(source[sourceField] || {} as any),
            [field]: value
        };
    else
        source[field] = value;
}

export function handleChangeFactory<T, K extends keyof T>(source: T, sourceField?: K) {
    return (e: Event) => {
        handleChange(e, source, sourceField);
    }
}
