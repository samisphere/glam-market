import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { getDeliveryOption } from "../../data/delivery_options.js";

export function getDeliveryDateString(delieveryOptionId) {
  const deliveryOption = getDeliveryOption(delieveryOptionId);
  const today = dayjs();
  let deliveryDate = today.add(deliveryOption.delieveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");
  return dateString
}
