# BrandControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**create5**](#create5) | **POST** /api/brands | |
|[**delete5**](#delete5) | **DELETE** /api/brands/{id} | |
|[**getAll4**](#getall4) | **GET** /api/brands | |
|[**getAllActive**](#getallactive) | **GET** /api/brands/active | |
|[**getById5**](#getbyid5) | **GET** /api/brands/{id} | |
|[**update5**](#update5) | **PUT** /api/brands/{id} | |

# **create5**
> ApiResponseBrandResponse create5(brandUpsertRequest)


### Example

```typescript
import {
    BrandControllerApi,
    Configuration,
    BrandUpsertRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new BrandControllerApi(configuration);

let brandUpsertRequest: BrandUpsertRequest; //

const { status, data } = await apiInstance.create5(
    brandUpsertRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **brandUpsertRequest** | **BrandUpsertRequest**|  | |


### Return type

**ApiResponseBrandResponse**

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

# **delete5**
> ApiResponseVoid delete5()


### Example

```typescript
import {
    BrandControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BrandControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.delete5(
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

# **getAll4**
> ApiResponseListBrandResponse getAll4()


### Example

```typescript
import {
    BrandControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BrandControllerApi(configuration);

const { status, data } = await apiInstance.getAll4();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListBrandResponse**

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

# **getAllActive**
> ApiResponseListBrandResponse getAllActive()


### Example

```typescript
import {
    BrandControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BrandControllerApi(configuration);

const { status, data } = await apiInstance.getAllActive();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListBrandResponse**

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

# **getById5**
> ApiResponseBrandResponse getById5()


### Example

```typescript
import {
    BrandControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BrandControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getById5(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseBrandResponse**

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

# **update5**
> ApiResponseBrandResponse update5(brandUpsertRequest)


### Example

```typescript
import {
    BrandControllerApi,
    Configuration,
    BrandUpsertRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new BrandControllerApi(configuration);

let id: number; // (default to undefined)
let brandUpsertRequest: BrandUpsertRequest; //

const { status, data } = await apiInstance.update5(
    id,
    brandUpsertRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **brandUpsertRequest** | **BrandUpsertRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseBrandResponse**

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

