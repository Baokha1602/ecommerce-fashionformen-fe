# CategoryControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**create4**](#create4) | **POST** /api/categories | |
|[**delete4**](#delete4) | **DELETE** /api/categories/{id} | |
|[**getAll3**](#getall3) | **GET** /api/categories | |
|[**getById4**](#getbyid4) | **GET** /api/categories/{id} | |
|[**update4**](#update4) | **PUT** /api/categories/{id} | |

# **create4**
> ApiResponseCategoryResponse create4(categoryUpsertRequest)


### Example

```typescript
import {
    CategoryControllerApi,
    Configuration,
    CategoryUpsertRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new CategoryControllerApi(configuration);

let categoryUpsertRequest: CategoryUpsertRequest; //

const { status, data } = await apiInstance.create4(
    categoryUpsertRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **categoryUpsertRequest** | **CategoryUpsertRequest**|  | |


### Return type

**ApiResponseCategoryResponse**

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

# **delete4**
> ApiResponseVoid delete4()


### Example

```typescript
import {
    CategoryControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CategoryControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.delete4(
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

# **getAll3**
> ApiResponseListCategoryResponse getAll3()


### Example

```typescript
import {
    CategoryControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CategoryControllerApi(configuration);

const { status, data } = await apiInstance.getAll3();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListCategoryResponse**

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

# **getById4**
> ApiResponseCategoryResponse getById4()


### Example

```typescript
import {
    CategoryControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CategoryControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getById4(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseCategoryResponse**

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

# **update4**
> ApiResponseCategoryResponse update4(categoryUpsertRequest)


### Example

```typescript
import {
    CategoryControllerApi,
    Configuration,
    CategoryUpsertRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new CategoryControllerApi(configuration);

let id: number; // (default to undefined)
let categoryUpsertRequest: CategoryUpsertRequest; //

const { status, data } = await apiInstance.update4(
    id,
    categoryUpsertRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **categoryUpsertRequest** | **CategoryUpsertRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseCategoryResponse**

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

