import useBaseRequest from '@ahooksjs/use-request';
import request from '@/utils/request';

function useRequest(service, options) {
  return useBaseRequest(service, {
    manual: true,
    throwOnError: true,
    requestMethod: request,
    ...options,
  });
}

export default useRequest;
