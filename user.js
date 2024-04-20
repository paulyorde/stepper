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
    return Object.assign({}, user, { step: })
  }

  function refundItem() {
  
  }
  
  function getUserState() {
  
  }
  
  function goBack(user) {
    if(user.step === 1) {
        console.log('step 1')
    }
   
    console.log('go back', history1)
  }
  
  function goForward() {
  
  }

  console.log(history1)
