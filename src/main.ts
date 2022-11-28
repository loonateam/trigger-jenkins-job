import { setFailed, error, info } from '@actions/core';
import { context } from '@actions/github';
import axios from 'axios';

import type { Input, JenkinsParams, RunJenkinsJobProps } from './types';

const run = async (input: Input) => {
  const {
    jenkinsUrl,
    jenkinsUser,
    jenkinsToken,
    jenkinsJob,
    defaultBranch,
    platfrom,
    checkerName,
  } = input;

  try {
    const API_TOKEN = Buffer.from(`${jenkinsUser}:${jenkinsToken}`).toString('base64');
    const headers = {
      'Authorization': `Basic ${API_TOKEN}`
    }

    const branch = context.payload.pull_request?.head?.ref ?? defaultBranch;

    const buildAll = platfrom === 'all';
    const buildIos = buildAll || platfrom === 'ios';
    const buildAndroid = buildAll || platfrom === 'android';

    const jenkinsParams: JenkinsParams = {
      TARGET_BRANCH: branch,
      build_ios: buildIos,
      ios_build_type: 'ios_adhoc',
      build_android: buildAndroid,
      android_build_type: 'android_dev',
      tests: false,
      update_translations: false,
      cleanup: true,
      checker_name: checkerName,
    };

    await runJenkinsJob({jenkinsUrl, jenkinsJob, jenkinsParams, headers});
  } catch (err) {
    setFailed(err.message);
    error(err.message);
  }
};

const runJenkinsJob = async ({
  jenkinsUrl, jenkinsJob, jenkinsParams, headers
}: RunJenkinsJobProps) => {
  return axios(`https://${jenkinsUrl}/job/${jenkinsJob}/buildWithParameters`, {
    method: 'POST',
    params: new URLSearchParams(jenkinsParams as any),
    headers,
  })
    .then(() => {
      info(">>> Job is started!");

      return Promise.resolve(true);
    })
    .catch((err) => {
      setFailed(err);
      error(JSON.stringify(err));

      return Promise.reject(err);
    })
}

const Main = {
  run,
};

export default Main;
