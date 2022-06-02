import { notification } from 'ant-design-vue';

export function useNotification() {
  const onSuccess = (description: string) => {
    const key = 'success';
    notification.success({
      key,
      message: '',
      description,
    });
  };

  const onError = (description: string) => {
    const key = 'error';
    notification.error({
      key,
      message: '',
      description,
    });
  };

  return {
    onSuccess,
    onError,
  };
}
