// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {

  console.error("Input", JSON.stringify(input, null, 2));

  const error = {
    localizedMessage: "for orders greater then 500, customer must have at least 3 orders",
    target: "cart",

  };

  const orderSubtotal = parseFloat(input.cart.cost.subtotalAmount.amount)
  const errors = [];

  if(orderSubtotal > 500)
  {
    const numberOfOrders = input.cart.buyerIdentity?.customer?.numberOfOrders ?? 0
    if(numberOfOrders > 3){
      errors.push(error);
      errors.push({
        localizedMessage: "$.cart.buyerIdentity.email message email",
        target: "$.cart.buyerIdentity.email",
      });
      
    }
  }
  return {
    errors
  }
};