const {context} = require('@actions/github')
const core = require('@actions/core')

import isValidCommitMessage from './isValidCommitMesage'
import extractCommits from './extractCommits'

async function run() {
  core.info(
    `ℹ️ Checking if commit messages are following the Conventional Commits specification...`
  )
  const labelMap = JSON.parse(core.getInput('VALID_LABELS'))
  if (labelMap != '') {
    core.info('ℹ️ Found custom labels.')
    core.info(labelMap)
  } else {
    core.info('ℹ️ No custom labels found. Using default.')
  }
  const extractedCommits = await extractCommits(context, core)
  if (extractedCommits.length === 0) {
    core.info(`No commits to check, skipping...`)
    return
  }

  let hasErrors
  core.startGroup('Commit messages:')
  for (let i = 0; i < extractedCommits.length; i++) {
    let commit = extractedCommits[i]
    if (isValidCommitMessage(commit.message, labelMap)) {
      core.info(`✅ ${commit.message}`)
    } else {
      core.info(`🚩 ${commit.message}`)
      hasErrors = true
    }
  }
  core.endGroup()

  if (hasErrors) {
    core.setFailed(
      `🚫 According to the conventional-commits specification, some of the commit messages are not valid.`
    )
  } else {
    core.info(
      '🎉 All commit messages are following the Conventional Commits specification.'
    )
  }
}

run()
