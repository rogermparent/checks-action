import * as cp from 'child_process';
import * as path from 'path';

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs (creation)', () => {
  const entry = path.join(__dirname, '..', 'lib', 'main.js');
  const options: cp.ExecSyncOptions = {
    env: {
      GITHUB_REPOSITORY: 'LB/ABC',
      INPUT_TOKEN: 'ABC',
      INPUT_NAME: 'ABC',
      INPUT_STATUS: 'completed',
      INPUT_CONCLUSION: 'success',
    },
  };
  try {
    console.log(cp.execSync(`node ${entry}`, options).toString());
  } catch (e) {
    const error = e as Error & {stdout: Buffer};
    const output = error.stdout.toString();
    console.log(output);
    expect(output).toMatch(/::debug::Creating a new Run/);
    expect(output).toMatch(/::debug::HttpError: Bad credentials/);
  }
});

test('test runs (update)', () => {
  const entry = path.join(__dirname, '..', 'lib', 'main.js');
  const options: cp.ExecSyncOptions = {
    env: {
      GITHUB_REPOSITORY: 'LB/ABC',
      INPUT_TOKEN: 'ABC',
      INPUT_CHECK_ID: '123',
      INPUT_STATUS: 'completed',
      INPUT_CONCLUSION: 'success',
    },
  };
  try {
    console.log(cp.execSync(`node ${entry}`, options).toString());
  } catch (e) {
    const error = e as Error & {stdout: Buffer};
    const output = error.stdout.toString();
    console.log(output);
    expect(output).toMatch(/::debug::Updating a Run/);
    expect(output).toMatch(/::debug::HttpError: Bad credentials/);
  }
});

// TODO: add more
