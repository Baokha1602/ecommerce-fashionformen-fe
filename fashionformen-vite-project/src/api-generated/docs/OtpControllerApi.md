# OtpControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**resetPassword**](#resetpassword) | **POST** /api/auth/otp/reset-password | |
|[**sendOtp**](#sendotp) | **POST** /api/auth/otp/send | |
|[**verifyOtp**](#verifyotp) | **POST** /api/auth/otp/verify | |

# **resetPassword**
> ApiResponseVoid resetPassword(resetPasswordRequest)


### Example

```typescript
import {
    OtpControllerApi,
    Configuration,
    ResetPasswordRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new OtpControllerApi(configuration);

let resetPasswordRequest: ResetPasswordRequest; //

const { status, data } = await apiInstance.resetPassword(
    resetPasswordRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **resetPasswordRequest** | **ResetPasswordRequest**|  | |


### Return type

**ApiResponseVoid**

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

# **sendOtp**
> ApiResponseVoid sendOtp(otpSendRequest)


### Example

```typescript
import {
    OtpControllerApi,
    Configuration,
    OtpSendRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new OtpControllerApi(configuration);

let otpSendRequest: OtpSendRequest; //

const { status, data } = await apiInstance.sendOtp(
    otpSendRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **otpSendRequest** | **OtpSendRequest**|  | |


### Return type

**ApiResponseVoid**

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

# **verifyOtp**
> ApiResponseOtpResponse verifyOtp(otpVerifyRequest)


### Example

```typescript
import {
    OtpControllerApi,
    Configuration,
    OtpVerifyRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new OtpControllerApi(configuration);

let otpVerifyRequest: OtpVerifyRequest; //

const { status, data } = await apiInstance.verifyOtp(
    otpVerifyRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **otpVerifyRequest** | **OtpVerifyRequest**|  | |


### Return type

**ApiResponseOtpResponse**

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

