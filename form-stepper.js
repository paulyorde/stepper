
// updateStepProgress(
//   updateCurrentState
// updateCompletedState,
// updateData
// )(stepNumber, data);

// function updateCurrentState(stepNumber) {
//   // check all step states
// }

function cacheStepHistory() {
    /**
     * keep history alive in closure
     */
    let stepOne = {
      stepNumber: 1,
      current: false,
      completed: false,
      email: '',
    };
    let stepTwo = {
      stepNumber: 2,
      current: false,
      completed: false,
      username: '',
    };
    let stepThree = {
      stepNumber: 3,
      current: false,
      completed: false,
      url: '',
    };
    let stepsCache = { stepOne, stepTwo, stepThree };
  
    let updatedCache = {};
  
    /**
     * access history from above
     * need to pass in data(current,completed,email) object to update the cache-store
     */
    return function (stepNumber, data) {
      let { stepData, stepIsCurrent, stepIsCompleted } = data;
  
      /**
       * Step 1
       */
      if (stepsCache.stepOne.stepNumber === stepNumber) {
        // let { current, completed, email } = stepsCache.stepOne;
        // current = stepIsCurrent;
        // completed = stepIsCompleted;
        // email = stepData
        stepsCache.stepOne.current = stepIsCurrent;
        stepsCache.stepOne.completed = stepIsCompleted;
        stepsCache.stepOne.email = stepData;
        /**
         * Object Assign is overwriting on each call
         * so updatedCache is reset on each call
         * so it doesn't 'Persist'
         */
        // updatedCache = Object.assign({}, stepsCache, {
        //   stepOne: { current, completed, email },
        // });
        // console.log('step 1 cache', updatedCache);
      }
      /**
       * Step 2
       */
      if (stepsCache.stepTwo.stepNumber === stepNumber) {
        // if step 1 is completed
        // console.log('step 2 switch', stepsCache, stepsCache.stepTwo.stepNumber);
        console.log('step 2 switch', stepsCache.stepOne.completed);
        if (stepsCache.stepOne.completed === true) {
          console.log(
            'step 2 switch  -step 1 completed::',
            stepsCache.stepOne.completed
          );
          stepsCache.stepTwo.current = stepIsCurrent;
          stepsCache.stepTwo.completed = stepIsCompleted;
          stepsCache.stepTwo.username = stepData;
          // let { current, completed, username } = stepsCache.stepTwo;
          // current = stepIsCurrent;
          // completed = stepIsCompleted;
          // username = stepData;
          // updatedCache = Object.assign({}, stepsCache, {
          //   stepTwo: { current, completed, username },
          // });
          // console.log('step 2 cache', updatedCache);
        }
      }
      /**
       * Step 3
       */
      if (stepsCache.stepThree.stepNumber === stepNumber) {
        console.log('step 3 switch', stepsCache.stepThree.stepNumber);
      }
      // check step number
      // check state of matching step number
      return stepsCache;
    };
  }
  
  // console.log('completed', cache.stepOne.completed);
  // console.log('current', cache.stepOne.current);
  // console.log('email', cache.stepOne.email);
  
  /**
   * TODO curry functions/data
   * 1st arg/function call is data, then when that is w/o error 2nd arg/fucntion call to is complete and 3rd isCurrent to display the page
   */
  let data = { stepData: '@me', stepIsCompleted: true, stepIsCurrent: true };
  const step = cacheStepHistory();
  const cached1 = step(1, data);
  console.log('step 1 history', cached1);
  
  let data2 = { stepData: 'paaru', stepIsCompleted: true, stepIsCurrent: true };
  const step2 = cacheStepHistory();
  const cached2 = step2(2, data2);
  console.log('step 2 history', cached2);
  
  /**
   * function assignment
   * recieves function as parameter
   * the functions recieves a default value of 5 as a parameter
   */
  const hof = (fn) => fn(5);
  hof((x) => {
    console.log(x);
  });
  
  /**
   * pass a function (at run time) that returns a function (at run time)
   * enables functions to be determined as they are needed while the program is being used
   */
  const foo = hof((x) => {
    /** State - data available later in the program  */
    /** data could be passed in from the outside action and used at later action */
    const y = 100;
    return (x) => {
      console.log(x * 5 + y);
    };
  });
  
  foo(5);
  
  /** how to access closure properties? */
  const closure = () => {
    let count = 0;
    return () => {
      return count++;
    };
  };
  
  const increment = closure();
  
  console.log(increment());
  console.log(increment());
  console.log(increment());
  console.log(increment());
  
  /** Curry
   * pass some data at some actions
   * then pass some other data at another action
   */
  const multiply = (a) => (b) => a * b;
  const multiply5 = multiply(5);
  console.log(multiply5(4));
  
  const multiply20 = multiply(20);
  console.log(multiply20(4));
  
  /** Partial Application
   *  split parameters into groups
   */
  
  const partialMultiply = (a, b, c) => a * b * c;
  const partialMultiply5 = partialMultiply.bind(null, 5);
  console.log(partialMultiply5(4, 10));
  
  const partialMultiply5and10 = partialMultiply.bind(null, 5, 60);
  console.log(partialMultiply5and10(4));
  
  const abs = (num) => Math.abs(num);
  
  /** Compose Pipe
   * Pipe = first function parameter gets ran first
   * Compose = second function parameter gets ran first
   */
  const compose = (f, g) => (data) => f(g(data));
  const getAbs = compose(multiply5, abs);
  console.log(getAbs(-50));