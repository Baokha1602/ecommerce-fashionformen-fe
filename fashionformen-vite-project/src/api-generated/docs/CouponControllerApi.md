# CouponControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getAvailableCoupons**](#getavailablecoupons) | **GET** /api/coupons/available | |
|[**getByCode**](#getbycode) | **GET** /api/coupons/code/{code} | |

# **getAvailableCoupons**
> ApiResponseListCouponResponse getAvailableCoupons()


### Example

```typescript
import {
    CouponControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CouponControllerApi(configuration);

const { status, data } = await apiInstance.getAvailableCoupons();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListCouponResponse**

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

# **getByCode**
> ApiResponseCouponResponse getByCode()


### Example

```typescript
import {
    CouponControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CouponControllerApi(configuration);

let code: string; // (default to undefined)

const { status, data } = await apiInstance.getByCode(
    code
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **code** | [**string**] |  | defaults to undefined|


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

