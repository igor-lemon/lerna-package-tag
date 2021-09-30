import github from "@actions/github";
import core from "@actions/core";
import parse from "./parse";

async function runAction() {
  try {
    const packageInfo = parse(github.context.ref)

    if (!packageInfo) {
      core.warning("We couldn't detect Lerna syntax tag")
      return
    }

    const { scope, packageName, version } = packageInfo

    core.setOutput('package_name', packageName)
    core.setOutput('version', version)
    core.setOutput('scope', scope)

    core.exportVariable('LERNA_PACKAGE_NAME', packageName)
    core.exportVariable('LERNA_PACKAGE_VERSION', version)
    core.exportVariable('LERNA_PACKAGE_SCOPE', scope)
  } catch (error) {
    core.setFailed(error.message)
  }
}

runAction()
