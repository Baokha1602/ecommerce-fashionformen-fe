# TagControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**create1**](#create1) | **POST** /api/tags | |
|[**delete1**](#delete1) | **DELETE** /api/tags/{id} | |
|[**getAll**](#getall) | **GET** /api/tags | |
|[**getById1**](#getbyid1) | **GET** /api/tags/{id} | |
|[**update1**](#update1) | **PUT** /api/tags/{id} | |

# **create1**
> ApiResponseTagResponse create1(tagCreateRequest)


### Example

```typescript
import {
    TagControllerApi,
    Configuration,
    TagCreateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new TagControllerApi(configuration);

let tagCreateRequest: TagCreateRequest; //

const { status, data } = await apiInstance.create1(
    tagCreateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tagCreateRequest** | **TagCreateRequest**|  | |


### Return type

**ApiResponseTagResponse**

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

# **delete1**
> ApiResponseVoid delete1()


### Example

```typescript
import {
    TagControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TagControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.delete1(
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

# **getAll**
> ApiResponseListTagResponse getAll()


### Example

```typescript
import {
    TagControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TagControllerApi(configuration);

const { status, data } = await apiInstance.getAll();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListTagResponse**

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

# **getById1**
> ApiResponseTagResponse getById1()


### Example

```typescript
import {
    TagControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TagControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getById1(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseTagResponse**

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

# **update1**
> ApiResponseTagResponse update1(tagUpdateRequest)


### Example

```typescript
import {
    TagControllerApi,
    Configuration,
    TagUpdateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new TagControllerApi(configuration);

let id: number; // (default to undefined)
let tagUpdateRequest: TagUpdateRequest; //

const { status, data } = await apiInstance.update1(
    id,
    tagUpdateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tagUpdateRequest** | **TagUpdateRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseTagResponse**

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

