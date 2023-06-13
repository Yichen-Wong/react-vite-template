function syncDelay(seconds = 1) {
    let _timeID: null | number
    return new Promise<void>(resolve => {
        _timeID = window.setTimeout(() => {
            resolve()
            if (_timeID !== null) {
                clearTimeout(_timeID)
            }
        }, seconds * 1000)
    })
}

export default syncDelay
