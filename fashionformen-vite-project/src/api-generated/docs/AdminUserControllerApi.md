# AdminUserControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**deleteUser**](#deleteuser) | **DELETE** /api/users/{id} | |
|[**getUserById**](#getuserbyid) | **GET** /api/users/{id} | |
|[**getUsers**](#getusers) | **GET** /api/users | |
|[**updateUserStatus**](#updateuserstatus) | **PATCH** /api/users/{id}/status | |

# **deleteUser**
> ApiResponseVoid deleteUser()


### Example

```typescript
import {
    AdminUserControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminUserControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deleteUser(
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

# **getUserById**
> ApiResponseUserResponse getUserById()


### Example

```typescript
import {
    AdminUserControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminUserControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getUserById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseUserResponse**

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

# **getUsers**
> ApiResponsePageUserResponse getUsers()


### Example

```typescript
import {
    AdminUserControllerApi,
    Configuration,
    Pageable
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminUserControllerApi(configuration);

let pageable: Pageable; // (default to undefined)
let keyword: string; // (optional) (default to undefined)
let role: 'ADMIN' | 'CUSTOMER' | 'STAFF'; // (optional) (default to undefined)
let isActive: boolean; // (optional) (default to undefined)

const { status, data } = await apiInstance.getUsers(
    pageable,
    keyword,
    role,
    isActive
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pageable** | **Pageable** |  | defaults to undefined|
| **keyword** | [**string**] |  | (optional) defaults to undefined|
| **role** | [**&#39;ADMIN&#39; | &#39;CUSTOMER&#39; | &#39;STAFF&#39;**]**Array<&#39;ADMIN&#39; &#124; &#39;CUSTOMER&#39; &#124; &#39;STAFF&#39;>** |  | (optional) defaults to undefined|
| **isActive** | [**boolean**] |  | (optional) defaults to undefined|


### Return type

**ApiResponsePageUserResponse**

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

# **updateUserStatus**
> ApiResponseUserResponse updateUserStatus()


### Example

```typescript
import {
    AdminUserControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminUserControllerApi(configuration);

let id: number; // (default to undefined)
let isActive: boolean; // (default to undefined)

const { status, data } = await apiInstance.updateUserStatus(
    id,
    isActive
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|
| **isActive** | [**boolean**] |  | defaults to undefined|


### Return type

**ApiResponseUserResponse**

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

