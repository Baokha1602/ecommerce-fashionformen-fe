# UserAddressControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**_delete**](#_delete) | **DELETE** /api/user-addresses/{id} | |
|[**create**](#create) | **POST** /api/user-addresses | |
|[**getAll**](#getall) | **GET** /api/user-addresses | |
|[**getById**](#getbyid) | **GET** /api/user-addresses/{id} | |
|[**getByUserId**](#getbyuserid) | **GET** /api/user-addresses/user/{userId} | |
|[**update**](#update) | **PUT** /api/user-addresses/{id} | |

# **_delete**
> ApiResponseVoid _delete()


### Example

```typescript
import {
    UserAddressControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserAddressControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance._delete(
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

# **create**
> ApiResponseUserAddressResponse create(userAddressCreateRequest)


### Example

```typescript
import {
    UserAddressControllerApi,
    Configuration,
    UserAddressCreateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UserAddressControllerApi(configuration);

let userAddressCreateRequest: UserAddressCreateRequest; //

const { status, data } = await apiInstance.create(
    userAddressCreateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userAddressCreateRequest** | **UserAddressCreateRequest**|  | |


### Return type

**ApiResponseUserAddressResponse**

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

# **getAll**
> ApiResponseListUserAddressResponse getAll()


### Example

```typescript
import {
    UserAddressControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserAddressControllerApi(configuration);

const { status, data } = await apiInstance.getAll();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListUserAddressResponse**

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

# **getById**
> ApiResponseUserAddressResponse getById()


### Example

```typescript
import {
    UserAddressControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserAddressControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseUserAddressResponse**

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

# **getByUserId**
> ApiResponseListUserAddressResponse getByUserId()


### Example

```typescript
import {
    UserAddressControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserAddressControllerApi(configuration);

let userId: number; // (default to undefined)

const { status, data } = await apiInstance.getByUserId(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseListUserAddressResponse**

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

# **update**
> ApiResponseUserAddressResponse update(userAddressUpdateRequest)


### Example

```typescript
import {
    UserAddressControllerApi,
    Configuration,
    UserAddressUpdateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UserAddressControllerApi(configuration);

let id: number; // (default to undefined)
let userAddressUpdateRequest: UserAddressUpdateRequest; //

const { status, data } = await apiInstance.update(
    id,
    userAddressUpdateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userAddressUpdateRequest** | **UserAddressUpdateRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseUserAddressResponse**

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

