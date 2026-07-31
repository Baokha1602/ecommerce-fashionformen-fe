# CartResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [optional] [default to undefined]
**userId** | **number** |  | [optional] [default to undefined]
**appliedCouponCode** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]
**cartItems** | [**Array&lt;CartItemResponse&gt;**](CartItemResponse.md) |  | [optional] [default to undefined]
**subtotal** | **number** |  | [optional] [default to undefined]
**productDiscount** | **number** |  | [optional] [default to undefined]
**couponDiscount** | **number** |  | [optional] [default to undefined]
**rankDiscount** | **number** |  | [optional] [default to undefined]
**shippingFee** | **number** |  | [optional] [default to undefined]
**finalAmount** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { CartResponse } from './api';

const instance: CartResponse = {
    id,
    userId,
    appliedCouponCode,
    createdAt,
    updatedAt,
    cartItems,
    subtotal,
    productDiscount,
    couponDiscount,
    rankDiscount,
    shippingFee,
    finalAmount,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
