// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  console.error('input', input)

  const cartTotal = parseFloat(input.cart.cost.totalAmount.amount ?? "0.0")
  if(cartTotal < 100){
    console.error('cartTotal is less than 100')
    return NO_CHANGES
  } 
  console.error('cartTotal is greater than or equal to 100')
  const hidePaymentMethod = input.paymentMethods.find(method => method.name.includes('Cash on Delivery'))
  if (!hidePaymentMethod) {
    console.error('No payment method found with name "Cash on Delivery"')
    return NO_CHANGES;
  }

  console.error('Payment method found with name Cash on Delivery, will be hidden')


  return {
    operations: [
      {
        hide: {
          paymentMethodId: hidePaymentMethod.id
        }
      }
    ]
  }

};