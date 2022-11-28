import { getInput, setOutput, info } from '@actions/core';
import Main from './main';
import type { Input, Platforms } from './types';

const input: Input = {
  githubToken: getInput('githubToken'),
  jenkinsUser: getInput('jenkinsUser'),
  jenkinsToken: getInput('jenkinsToken'),
  jenkinsUrl: getInput('jenkinsUrl'),
  jenkinsJob: getInput('jenkinsJob'),
  defaultBranch: getInput('defaultBranch'),
  platform: getInput('platform') as Platforms,
  checkerName: getInput('checkerName'),
};

Main.run(input)
  .then(() => {
    setOutput('result', 'success');
  })
  .catch((error) => {
    setOutput('result', 'success');
    info(error.message);
  });
