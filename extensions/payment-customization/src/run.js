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
  console.error('input', JSON.stringify(input))

  const configuration = JSON.parse(input.paymentCustomization.metafield?.value ?? "{}")
  console.error('configuration', JSON.stringify(configuration));

  //return if no configuration
  if(!configuration.paymentMethodName || !configuration.cartTotal){
    return NO_CHANGES

  }



  const cartTotal = parseFloat(input.cart.cost.totalAmount.amount ?? "0.0")
  if(cartTotal < configuration.cartTotal){
    console.error('No Change - cartTotal is less than', configuration.cartTotal)
    return NO_CHANGES
  } 
  console.error('cartTotal is greater than or equal to ', configuration.cartTotal)

  const hidePaymentMethod = input.paymentMethods.find(method => method.name.includes(configuration.paymentMethodName))
  if (!hidePaymentMethod) {
    console.error('No payment method found with name ', configuration.paymentMethodName)
    return NO_CHANGES;
  }

  console.error('Payment method found with name', configuration.paymentMethodName,', will be hidden')


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