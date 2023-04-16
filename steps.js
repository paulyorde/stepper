/**
 * Blog Title: Minimize This - Functional State Machine Forms w/ side effects
 * 
 * Todo: build a History store that knows values of form fields and section-completeness 
 */
const stepProgress = document.querySelectorAll('div[style*="width"]')
const step1Form = document.querySelector('#step1-form')
const step2Form = document.querySelector('#step-2-form')
const step3Form = document.querySelector('#step-3-form')
const btnStep2 = document.querySelector('#step2')
const btnStep3 = document.querySelector('#step3')

/** Todo: refactor::DRY */
step1Form.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('form 1 btn thing')
    /** Greate place for a small target.oninput tutorial */
    e.target.oninput = () => {
        /** Discuse the data structure Oject: Object:  value and passing the functions to the function (functional higher-order) */
        runStepFactory({data: { step: e.target.dataset.step, value: e.target.value, field: e.target.type}})
    }
})

step2Form.addEventListener('click', (e) => {
    e.preventDefault();
    e.target.oninput = () => {
        runStepFactory({data: { step: e.target.dataset.step, value: e.target.value, field: e.target.type}})
    }
})

step3Form.addEventListener('click', (e) => {
    e.preventDefault();
    e.target.oninput = () => {
        runStepFactory({data: { step: e.target.dataset.step, value: e.target.value, field: e.target.type}})
    }
})

const pipe = (f, g) => (...args) => g(f(...args))
const setupStepFactory  = (...fns) => fns.reduce(pipe);
const initStepsHistory = () => {
     // encapsulates and closes over the data - object oriented pillar of state 
     let history = []
     let flag = false
     /** memoizeStepsHistory - Cache actually, not memozie **************************************** */
     return function(data) {
        history.forEach(v => {
            if(v.data.value === data.data.value) {
                flag = true
            } else {
                flag = false
            }
        })
     
        if(!flag) {
            const cloneData = {...data}
            history.push(cloneData)
        }

        return history
     }
}
const handleStepHistory = initStepsHistory()

const handleProgressBar = (history) => {
    let updatedHistory = []
    history.forEach(({data} , i) => {
        let width
        switch(true) {
            case (data.step === "1.1" && data.value && data.field === 'email'):
                width = 1 * 33.33
                stepProgress[0].setAttribute('style', `width: ${width}%`)
                break
            case (data.step === "1.2" && data.value && data.field === 'text'):
                width = 2 * 33.33
                stepProgress[0].setAttribute('style', `width: ${width}%`)
                break
            case (data.step === "1.3" && data.value && data.field === 'text'):
                width = 3 * 33.33
                stepProgress[0].setAttribute('style', `width: ${width}%`)
                updatedHistory.push({data: {...data, complete: true}})
                break
            case (data.step === "2.1"):
                width = 1 * 50
                stepProgress[1].setAttribute('style', `width: ${width}%`)
                break
            case (data.step === "2.2"):
                width = 2 * 50
                stepProgress[1].setAttribute('style', `width: ${width}%`)
                updatedHistory.push({data: {...data, complete: true}})
                break
            case (data.step === "3.1"):
                width = 1 * 100
                stepProgress[2].setAttribute('style', `width: ${width}%`)
                updatedHistory.push({data: {...data, complete: true}})
                break
        }
    })
    if(updatedHistory.length) {
        return updatedHistory
    }
    return history
}
const handleComplete = (history) => {
    let updatedHistory = []
        history?.forEach(({data}, i) => {
            if(data.complete && data.step === '1.3') {
                btnStep2.removeAttribute('disabled')
            }
            if(data.complete && data.step === '2.2') {
                btnStep3.removeAttribute('disabled')
            }
            // if(data.complete && data.step === '3.1') {
            // }
        })
    return updatedHistory
}
const runStepFactory = setupStepFactory(
    // Todo: scrub and sanitize data
    handleStepHistory,
    handleProgressBar,
    handleComplete
)