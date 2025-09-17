// src/discountUtil.js

export function calculateDiscount(totalAmount, discountPercent) {
  const discount = (totalAmount * discountPercent) / 100;
  const finalAmount = totalAmount - discount;
  return {
    discount: parseFloat(discount.toFixed(2)),
    finalAmount: parseFloat(finalAmount.toFixed(2)),
  };
}

export function getCouponDiscount(code, totalAmount) {
  const coupons = {
    MAHI10: 10,
    MAHI20: 20,
    MAHI30: 30,
  };

  const percent = coupons[code?.toUpperCase()] || 0;
  const isValid = percent > 0;

  const { discount, finalAmount } = calculateDiscount(totalAmount, percent);

  return {
    isValid,
    discountPercent: percent,
    discountAmount: parseFloat(discount.toFixed(2)),
    finalAmount: parseFloat(finalAmount.toFixed(2)),
  };
}

export function getFinalAmount(baseAmount, couponCode, discountPercent, taxPercent, shipping) {
  const couponResult = getCouponDiscount(couponCode, baseAmount);
  const couponDiscount = couponResult.discountAmount;

  const { discount: directDiscount } = calculateDiscount(baseAmount, discountPercent);

  const totalDiscount = couponDiscount + directDiscount;
  const discountedAmount = parseFloat((baseAmount - totalDiscount).toFixed(2));

  const taxAmount = parseFloat(((discountedAmount * taxPercent) / 100).toFixed(2));
  const finalPayable = parseFloat((discountedAmount + taxAmount + shipping).toFixed(2));

  return {
    baseAmount: parseFloat(baseAmount.toFixed(2)),
    couponResult,
    discount: parseFloat(directDiscount.toFixed(2)),
    taxAmount,
    shipping,
    finalPayable,
  };
}
