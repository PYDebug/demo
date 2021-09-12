import axios from 'axios';

export default async function request(options) {
  try {
    const response = await axios(options);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.errorMessage || '接口异常',
    };
  }
}
