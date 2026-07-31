# PromotionControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getActivePromotions**](#getactivepromotions) | **GET** /api/promotions/active | |
|[**validateCoupon**](#validatecoupon) | **GET** /api/promotions/validate | |

# **getActivePromotions**
> ApiResponseListPromotionResponse getActivePromotions()


### Example

```typescript
import {
    PromotionControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PromotionControllerApi(configuration);

const { status, data } = await apiInstance.getActivePromotions();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListPromotionResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **validateCoupon**
> ApiResponseCouponResponse validateCoupon()


### Example

```typescript
import {
    PromotionControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PromotionControllerApi(configuration);

let couponCode: string; // (default to undefined)
let orderAmount: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.validateCoupon(
    couponCode,
    orderAmount
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **couponCode** | [**string**] |  | defaults to undefined|
| **orderAmount** | [**number**] |  | (optional) defaults to undefined|


### Return type

**ApiResponseCouponResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

