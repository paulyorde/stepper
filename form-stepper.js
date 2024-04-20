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
        stepsCache.stepOne.current = stepIsCurrent;
        stepsCache.stepOne.completed = stepIsCompleted;
        stepsCache.stepOne.email = stepData;
      }
      /**
       * Step 2
       */
      if (stepsCache.stepTwo.stepNumber === stepNumber) {
        console.log('step 2 switch', stepsCache.stepOne.completed);
        if (stepsCache.stepOne.completed === true) {
          console.log(
            'step 2 switch  -step 1 completed::',
            stepsCache.stepOne.completed
          );
          stepsCache.stepTwo.current = stepIsCurrent;
          stepsCache.stepTwo.completed = stepIsCompleted;
          stepsCache.stepTwo.username = stepData;
        }
      }
      /**
       * Step 3
       */
      if (stepsCache.stepThree.stepNumber === stepNumber) {
        console.log('step 3 switch', stepsCache.stepThree.stepNumber);
      }
      return stepsCache;
    };
  }

  let data = { stepData: '@me', stepIsCompleted: true, stepIsCurrent: true };
  const step = cacheStepHistory();
  const cached1 = step(1, data);
  console.log('step 1 history', cached1);
  
  let data2 = { stepData: 'paaru', stepIsCompleted: true, stepIsCurrent: true };
  const step2 = cacheStepHistory();
  const cached2 = step2(2, data2);
  console.log('step 2 history', cached2);
