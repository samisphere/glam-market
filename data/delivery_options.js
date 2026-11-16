export const deliveryOptions = [
  {
    id: "DRK001",
    delieveryDays: 7,
    priceCents: 0,
  },
  {
    id: "DRK002",
    delieveryDays: 5,
    priceCents: 1099,
  },
  {
    id: "DRK003",
    delieveryDays: 3,
    priceCents: 2099,
  },
];
export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option
    }
  })
  return deliveryOption || deliveryOptions[0]
}
