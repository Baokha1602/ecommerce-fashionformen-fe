# BannerControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**create6**](#create6) | **POST** /api/banners | |
|[**delete6**](#delete6) | **DELETE** /api/banners/{id} | |
|[**getAll5**](#getall5) | **GET** /api/banners | |
|[**getAllActive1**](#getallactive1) | **GET** /api/banners/active | |
|[**getById6**](#getbyid6) | **GET** /api/banners/{id} | |
|[**update6**](#update6) | **PUT** /api/banners/{id} | |

# **create6**
> ApiResponseBannerResponse create6(bannerUpsertRequest)


### Example

```typescript
import {
    BannerControllerApi,
    Configuration,
    BannerUpsertRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new BannerControllerApi(configuration);

let bannerUpsertRequest: BannerUpsertRequest; //

const { status, data } = await apiInstance.create6(
    bannerUpsertRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **bannerUpsertRequest** | **BannerUpsertRequest**|  | |


### Return type

**ApiResponseBannerResponse**

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

# **delete6**
> ApiResponseVoid delete6()


### Example

```typescript
import {
    BannerControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BannerControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.delete6(
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

# **getAll5**
> ApiResponseListBannerResponse getAll5()


### Example

```typescript
import {
    BannerControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BannerControllerApi(configuration);

const { status, data } = await apiInstance.getAll5();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListBannerResponse**

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

# **getAllActive1**
> ApiResponseListBannerResponse getAllActive1()


### Example

```typescript
import {
    BannerControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BannerControllerApi(configuration);

const { status, data } = await apiInstance.getAllActive1();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListBannerResponse**

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

# **getById6**
> ApiResponseBannerResponse getById6()


### Example

```typescript
import {
    BannerControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BannerControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getById6(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseBannerResponse**

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

# **update6**
> ApiResponseBannerResponse update6(bannerUpsertRequest)


### Example

```typescript
import {
    BannerControllerApi,
    Configuration,
    BannerUpsertRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new BannerControllerApi(configuration);

let id: number; // (default to undefined)
let bannerUpsertRequest: BannerUpsertRequest; //

const { status, data } = await apiInstance.update6(
    id,
    bannerUpsertRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **bannerUpsertRequest** | **BannerUpsertRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseBannerResponse**

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

