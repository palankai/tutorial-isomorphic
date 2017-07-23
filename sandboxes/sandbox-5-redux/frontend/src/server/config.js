import fs from 'fs';
import path from 'path';

function readManifest(manifestPath, isProduction) {
  if(!isProduction) {
    return {
      'client.js': 'build/client.bundle.js',
      'manifest.js': 'build/manifest.bundle.js',
      'vendor.js': 'build/vendor.bundle.js'
    };
  }
  return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
}

function createConfig(env) {
  const isProduction = env.NODE_ENV === 'production';
  const BUILD_PATH = path.resolve(env.BUILD_PATH);
  const MANIFEST_PATH = path.resolve(BUILD_PATH, 'manifest.json');

  return {
    isProduction: isProduction,
    manifest: readManifest(MANIFEST_PATH, isProduction),
    BUILD_PATH: BUILD_PATH,
    STATIC_PATH: path.resolve(BUILD_PATH, 'www')
  };
}

export default createConfig;
