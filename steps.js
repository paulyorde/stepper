
const stepProgress = document.querySelectorAll('div[style*="width"]')
const step1 = document.querySelector('#exampleFormControlInput1')
const step2 = document.querySelector('#username')
const step3 = document.querySelector('#url')
const btnStep2 = document.querySelector('#step2')
const btnStep3 = document.querySelector('#step3')

const pipe = (f, g) => (...args) => g(f(...args))
const setupStepFactory  = (...fns) => fns.reduce(pipe);
const initStepsHistory = () => {
     // encapsulates and closes over the data - object oriented pillar of state 
     let history = []

     /** memoizeStepsHistory **************************************** */
     return function(data) {
         // keeps data from getting corrupted later - functional pillar of state 
         // const cloneData = Object.assign({}, data)
         const cloneData = {...data, hello: 'world'}
         history.push(cloneData)
         return history
     }
}
const memoizeStepHistory = initStepsHistory()
const handleSteps = (history) => {
    history.forEach(v => {
        if(v.step === 1) {
            if(v.complete) {
                stepProgress[0].setAttribute('style', 'width: 100%')
                btnStep2.removeAttribute('disabled')
            }
        }
        if(v.step === 2) {
            if(v.complete) {
                stepProgress[1].setAttribute('style', 'width: 100%')
                btnStep3.removeAttribute('disabled')
            }
        }
        if(v.step === 3) {
            if(v.complete) {
                stepProgress[2].setAttribute('style', 'width: 100%')
            }
        }
    })
    console.log('history', history)
}
const runStepFactory = setupStepFactory(
    // scrub and sanitize data
    memoizeStepHistory,
    handleSteps
)

// use data-step-# in html
// use in step factory to create data object
// if data# = 1 create object 
// will need to determine if complete later when more form elements are added 
step1.addEventListener('blur', (e) => {
    let stepData = {
        step: 1,
        complete: true,
        value: step1.value
    }
    runStepFactory(stepData)
})

step2.addEventListener('blur', (e) => {
    let stepData = {
        step: 2,
        complete: true,
        value: step2.value
    }
    runStepFactory(stepData)
})

step3.addEventListener('blur', (e) => {
    let stepData = {
        step: 3,
        complete: true,
        value: step3.value
    }
    runStepFactory(stepData)
})


/**
 * step 1 
 * Rules
 * not go to next screen when not complete - has error
 * not go back if immutable data has been filled
 * can go back to home screen any time but if immutable data is filled then must start over
 * 
 * 
 * 
 * screen 
 * progress bar fills in on complete 
 * step number indicatore fills in 
 * 
 * 
 * 
 * state 
 * each step/state should have a history 
 * use to check if step is complete/error or if immutable data has been accessed 
 * 
 */


/**
 * 
 *  TODO part 4 create web component and put up on open source components and flutter
 *  part 5 webpack, rollup, ( package manager , bundlers )
 *  part 6 - drag and drop form steps  - use es6 modules 
 *    marketing 
 * --- use in any framework
 * --- use for portfolio having put up on open source 
 * --- functional programming
 * --- PART 2 CSS (  google design, tailwind, bootstrap scss theme  )
 *          --- show staticsics of useage/companies that use love for frameworks
 * --- PART 3
 * --- persist data locally ( demonstrate db, local storage pros and cons)
 *      
 */


/**
 
    * todo functions ???
    * updateStep1(input), updateStep2(input), updateStep3(input) # 
    * 
    */
    


