const SentryCli = require('@sentry/cli');

class SentryHelper {
  constructor(options = {}) {

  // 将rewrite默认设为true
  this.options = Object.assign({ rewrite: true }, options);

    this.cli = this.getSentryCli();
    this.release = this.getReleasePromise();
  }

  getSentryCli() {
    const cli = new SentryCli(this.options.configFile);

    return cli;
  }

  getReleasePromise() {
    return (this.options.release ?
      Promise.resolve(this.options.release) :
      this.cli.releases.proposeVersion()
    ).then(version => `${version}`.trim());
  }

  finalizeRelease() {
    const { include } = this.options;

    if (!include) {
      console.error('`include` option is required');
      return Promise.resolve();
    }
    
    let release;
    return this.release
      .then(proposedVersion => {
        release = proposedVersion;
        return this.cli.releases.new(release);
      })
      .then(() => this.cli.releases.uploadSourceMaps(release, this.options))
      .then(() => this.cli.releases.finalize(release))
  }
}

module.exports = SentryHelper;