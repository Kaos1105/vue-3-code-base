module.exports = shipit => {
  // Load shipit-deploy tasks
  require('shipit-deploy')(shipit)
  require('shipit-slack')(shipit)

  shipit.initConfig({
    default: {
      workspace: './dist',
      keepWorkspace: false,
      repositoryUrl: '', // Skip fetching repo
      ignores: ['.git', 'node_modules', 'deploy'],
      deleteOnRollback: true,
      shallowClone: false,
      slack: {
        webhookUrl: 'https://hooks.slack.com/services/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',
        status: 'good',
        triggerEvent: 'deployed',
        channel: '#default',
        template: {
          attachments: [
            {
              fallback: 'Frontend deployed to {{buildEnv}}',
              title_link: '{{url}}',
              color: '{{status}}',
              fields: [
                {
                  title: 'TimeX CMS',
                  value: `Deploy CMS to ${ shipit.environment } successful !`,
                  short: true,
                },
              ],
            },
          ],
        },
      },
    },
    development: {
      servers: ['ec2-user@18.141.169.143'],
      key: './deploy/keys/gmv-imri-timex.pem',
      deployTo: '/var/www/html/timex/admin',
      build: 'npm run build:development',
      outputDir: './dist',
    },
    staging: {
      servers: ['centos@164.70.124.237'],
      key: './deploy/keys/id_rsa',
      deployTo: '/var/www/html/timex/admin',
      build: 'npm run build:staging',
      outputDir: './dist',
    },
    production: {
      servers: ['centos@164.70.124.237'],
      key: './deploy/keys/id_rsa',
      deployTo: '/var/www/html/timex/admin',
      build: 'npm run build:production',
      outputDir: './dist',
    },
  })

  shipit.blTask('deploy:environment', function () {
    shipit.local(
      `cp .env.${ shipit.environment } .env`,
    )
  })

  shipit.blTask('deploy:build', async () => {
    await shipit.local(shipit.config.build)
  })

  shipit.on('deploy', async () => {
    await shipit.start(['deploy:build'])
  })

  shipit.on('deployed', async () => {
    await shipit.local(`rm -rf ${ shipit.config.outputDir }`)
  })
}
