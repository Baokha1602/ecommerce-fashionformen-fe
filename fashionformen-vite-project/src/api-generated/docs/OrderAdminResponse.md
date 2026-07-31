# OrderAdminResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [optional] [default to undefined]
**userId** | **number** |  | [optional] [default to undefined]
**userAddressId** | **number** |  | [optional] [default to undefined]
**firstName** | **string** |  | [optional] [default to undefined]
**lastName** | **string** |  | [optional] [default to undefined]
**phoneNumber** | **string** |  | [optional] [default to undefined]
**email** | **string** |  | [optional] [default to undefined]
**orderStatus** | **string** |  | [optional] [default to undefined]
**paymentMethod** | **string** |  | [optional] [default to undefined]
**isPaid** | **boolean** |  | [optional] [default to undefined]
**subtotalOriginal** | **number** |  | [optional] [default to undefined]
**productDiscountAmount** | **number** |  | [optional] [default to undefined]
**rankDiscountAmount** | **number** |  | [optional] [default to undefined]
**couponDiscountAmount** | **number** |  | [optional] [default to undefined]
**couponCode** | **string** |  | [optional] [default to undefined]
**shippingFeeOriginal** | **number** |  | [optional] [default to undefined]
**shippingFeeActual** | **number** |  | [optional] [default to undefined]
**taxAmount** | **number** |  | [optional] [default to undefined]
**totalOrderAmount** | **number** |  | [optional] [default to undefined]
**finalAmount** | **number** |  | [optional] [default to undefined]
**notes** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]
**orderItems** | [**Array&lt;OrderItemResponse&gt;**](OrderItemResponse.md) |  | [optional] [default to undefined]
**statusHistory** | [**Array&lt;OrderStatusHistoryResponse&gt;**](OrderStatusHistoryResponse.md) |  | [optional] [default to undefined]

## Example

```typescript
import { OrderAdminResponse } from './api';

const instance: OrderAdminResponse = {
    id,
    userId,
    userAddressId,
    firstName,
    lastName,
    phoneNumber,
    email,
    orderStatus,
    paymentMethod,
    isPaid,
    subtotalOriginal,
    productDiscountAmount,
    rankDiscountAmount,
    couponDiscountAmount,
    couponCode,
    shippingFeeOriginal,
    shippingFeeActual,
    taxAmount,
    totalOrderAmount,
    finalAmount,
    notes,
    createdAt,
    updatedAt,
    orderItems,
    statusHistory,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
