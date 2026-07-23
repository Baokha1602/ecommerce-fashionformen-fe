# GhnAddressControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getDistricts**](#getdistricts) | **GET** /api/addresses/districts | |
|[**getProvinces**](#getprovinces) | **GET** /api/addresses/provinces | |
|[**getWards**](#getwards) | **GET** /api/addresses/wards | |

# **getDistricts**
> ApiResponseObject getDistricts()


### Example

```typescript
import {
    GhnAddressControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GhnAddressControllerApi(configuration);

let provinceId: number; // (default to undefined)

const { status, data } = await apiInstance.getDistricts(
    provinceId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **provinceId** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseObject**

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

# **getProvinces**
> ApiResponseObject getProvinces()


### Example

```typescript
import {
    GhnAddressControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GhnAddressControllerApi(configuration);

const { status, data } = await apiInstance.getProvinces();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseObject**

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

# **getWards**
> ApiResponseObject getWards()


### Example

```typescript
import {
    GhnAddressControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GhnAddressControllerApi(configuration);

let districtId: number; // (default to undefined)

const { status, data } = await apiInstance.getWards(
    districtId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **districtId** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseObject**

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

