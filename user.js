// closure that remebers each step
// ex use case
// each step has a separate screen containing it's own data 

// step one fill out your name, address

// step two choose plan level and length

// fill out credit card 

// review and submit ( use data from previous steps)

const user = {
    name: 'Kim',
    active: true,
    cart: [],
    purchases: [],
    step: 0
  }
  const history1 = [];
  const compose = (f, g) => (...args) => f(g(...args))
  const pipe = (f, g) => (...args) => g(f(...args))
  const purchaseItem  = (...fns) => fns.reduce(compose);
  const purchaseItem2  = (...fns) => fns.reduce(pipe);
  purchaseItem2(
    addItemToCart,
    applyTaxToItems,
    buyItem,
    emptyUserCart,
  )(user, {name: 'laptop', price: 60})

//   purchaseItem2(
//     addItemToCart,
//     applyTaxToItems,
//     buyItem,
//     emptyUserCart,
//   )(user, {name: 'bag', price: 200})
  // purchaseItem(
  //   emptyUserCart,
  //   buyItem,
  //   applyTaxToItems,
  //   addItemToCart
  // )(user, {name: 'laptop', price: 50})
  function addItemToCart(user, item) {
    let {step} = user
    console.log(step)
    step += 1
    history1.push(user)
    const cart = user.cart.concat(item)
    return Object.assign({}, user, {cart, step});
  }
  
  function applyTaxToItems(user) {
    history1.push(user)
    const {cart} = user;
    const taxRate = 1.3;
    const updatedCart = cart.map(item => {
      return {
        name: item.name,
        price: item.price*taxRate
      }
    })
    return Object.assign({}, user, { cart: updatedCart });
  }
  
  function buyItem(user) {
    console.log(user.step)
    history1.push(user)
    const itemsInCart = user.cart;
    return Object.assign(
      {},
      user, 
      { purchases: itemsInCart }
    );
  }
  function emptyUserCart(user) {
    history1.push(user)
    return Object.assign({}, user, { cart: [] });
  }

  function updateStep(user) {

    // return Object.assign({}, user, { step: })
  }

  function refundItem() {
  
  }
  
  function getUserState() {
  
  }
  
  function goBack(user) {
    if(user.step === 1) {
        console.log('step 1')
    }
    // what is current step 
    // step 1 = add to cart 
    // step 2 = tax
    // 3 = buy
    // 4 = empty 
    console.log('go back', history1)
  }
  
  function goForward() {
  
  }

  console.log(history1)
/**
 * 
 * @returns fn that looks like () => //code 
 */
// const initSteps = (name, address) => {
//    name = "init name"
//    address = 'init address'
//    return (name, address) => {
    
    
//     console.log(`step 1 > name: ${name} > address: ${address}`)

//     // calling inner function should have access to name property of outer function
//     return function step2(level, length) {
//         let step2Name = name
//         console.log(`step 2 > level: ${level} > length: ${length}`)
//     }
//    }
// }
// const step1 = initSteps()

// const step2 = step1('paul', ' jeruselam, Israel')
// step2('volunteer', ' 1 yr')



// // initSteps.stay = "staying"

// console.log('outer', step2.step2Name)




