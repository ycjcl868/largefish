import { IApi } from 'umi';

export default (api: IApi) => {
  return {
    presets: [require.resolve('@umijs/preset-react')],
    plugins: [
      require.resolve('./plugins/bar'),
    ],
  }
}
