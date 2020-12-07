import { IApi } from 'umi';

export default (api: IApi) => {
  api.onStart(() => {
    api.logger.info('[Bar Plugin] onStart');
  })
}
