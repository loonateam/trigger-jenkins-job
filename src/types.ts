export type Platfroms = 'ios' | 'android' | 'all';

export type IosBuildType = 'ios_adhoc' | 'ios_tf_dev';

export type AndroidBuildType = 'android_dev' | 'android_prod';

export type Input = {
  githubToken: string;
  jenkinsUser: string;
  jenkinsToken: string;
  jenkinsUrl: string;
  jenkinsJob: string;
  defaultBranch: string;
  platfrom: Platfroms;
  checkerName: string;
}

export type JenkinsParams = {
  TARGET_BRANCH: string;
  build_ios: boolean;
  ios_build_type: IosBuildType;
  build_android: boolean;
  android_build_type: AndroidBuildType;
  tests: boolean;
  update_translations: boolean;
  cleanup: boolean;
  checker_name: string;
};

export type Headers = {
  Authorization: string;
}

export type RunJenkinsJobProps = {
  jenkinsUrl: string;
  jenkinsJob: string;
  jenkinsParams: JenkinsParams;
  headers: Headers;
}
