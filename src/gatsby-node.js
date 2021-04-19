import { unlinkSync } from 'fs';
import LoadablePlugin from '@loadable/webpack-plugin';
import { statsFilename, statsPath } from './constants';

export const onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === 'build-javascript' || stage === 'develop' || stage === 'develop-html') {
    actions.setWebpackConfig({
      plugins: [
        new LoadablePlugin({
          filename: statsFilename,
          writeToDisk: true,
        }),
      ],
    });
  }
};

export const onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({ name: '@loadable/babel-plugin' });
};

export const onPostBuild = () => {
  // Clean after ourselves
  unlinkSync(statsPath);
};
