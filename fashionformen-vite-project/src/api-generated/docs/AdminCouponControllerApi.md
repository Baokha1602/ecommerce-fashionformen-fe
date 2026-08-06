# AdminCouponControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**create7**](#create7) | **POST** /api/admin/coupons | |
|[**delete7**](#delete7) | **DELETE** /api/admin/coupons/{id} | |
|[**getAll7**](#getall7) | **GET** /api/admin/coupons | |
|[**getById7**](#getbyid7) | **GET** /api/admin/coupons/{id} | |
|[**getUsageHistory**](#getusagehistory) | **GET** /api/admin/coupons/{id}/usage-history | |
|[**update7**](#update7) | **PUT** /api/admin/coupons/{id} | |

# **create7**
> ApiResponseCouponResponse create7(couponCreateRequest)


### Example

```typescript
import {
    AdminCouponControllerApi,
    Configuration,
    CouponCreateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminCouponControllerApi(configuration);

let couponCreateRequest: CouponCreateRequest; //

const { status, data } = await apiInstance.create7(
    couponCreateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **couponCreateRequest** | **CouponCreateRequest**|  | |


### Return type

**ApiResponseCouponResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **delete7**
> ApiResponseVoid delete7()


### Example

```typescript
import {
    AdminCouponControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminCouponControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.delete7(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseVoid**

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

# **getAll7**
> ApiResponseListCouponResponse getAll7()


### Example

```typescript
import {
    AdminCouponControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminCouponControllerApi(configuration);

const { status, data } = await apiInstance.getAll7();
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

# **getById7**
> ApiResponseCouponResponse getById7()


### Example

```typescript
import {
    AdminCouponControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminCouponControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getById7(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


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

# **getUsageHistory**
> ApiResponseListCouponUsageHistoryResponse getUsageHistory()


### Example

```typescript
import {
    AdminCouponControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminCouponControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getUsageHistory(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseListCouponUsageHistoryResponse**

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

# **update7**
> ApiResponseCouponResponse update7(couponUpdateRequest)


### Example

```typescript
import {
    AdminCouponControllerApi,
    Configuration,
    CouponUpdateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminCouponControllerApi(configuration);

let id: number; // (default to undefined)
let couponUpdateRequest: CouponUpdateRequest; //

const { status, data } = await apiInstance.update7(
    id,
    couponUpdateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **couponUpdateRequest** | **CouponUpdateRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseCouponResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

