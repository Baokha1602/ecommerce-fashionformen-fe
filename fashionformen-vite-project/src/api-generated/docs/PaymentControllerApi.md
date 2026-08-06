# PaymentControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**moMoIpn**](#momoipn) | **POST** /api/payments/momo/ipn | |
|[**moMoReturn**](#momoreturn) | **GET** /api/payments/momo/return | |
|[**vnPayIpn**](#vnpayipn) | **GET** /api/payments/vnpay/ipn | |
|[**vnPayReturn**](#vnpayreturn) | **GET** /api/payments/vnpay/return | |

# **moMoIpn**
> { [key: string]: string; } moMoIpn(requestBody)


### Example

```typescript
import {
    PaymentControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentControllerApi(configuration);

let requestBody: { [key: string]: object; }; //

const { status, data } = await apiInstance.moMoIpn(
    requestBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requestBody** | **{ [key: string]: object; }**|  | |


### Return type

**{ [key: string]: string; }**

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

# **moMoReturn**
> string moMoReturn()


### Example

```typescript
import {
    PaymentControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentControllerApi(configuration);

let params: { [key: string]: string; }; // (default to undefined)

const { status, data } = await apiInstance.moMoReturn(
    params
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **params** | **{ [key: string]: string; }** |  | defaults to undefined|


### Return type

**string**

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

# **vnPayIpn**
> { [key: string]: string; } vnPayIpn()


### Example

```typescript
import {
    PaymentControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentControllerApi(configuration);

let params: { [key: string]: string; }; // (default to undefined)

const { status, data } = await apiInstance.vnPayIpn(
    params
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **params** | **{ [key: string]: string; }** |  | defaults to undefined|


### Return type

**{ [key: string]: string; }**

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

# **vnPayReturn**
> ApiResponseMapStringString vnPayReturn()


### Example

```typescript
import {
    PaymentControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentControllerApi(configuration);

let params: { [key: string]: string; }; // (default to undefined)

const { status, data } = await apiInstance.vnPayReturn(
    params
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **params** | **{ [key: string]: string; }** |  | defaults to undefined|


### Return type

**ApiResponseMapStringString**

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

