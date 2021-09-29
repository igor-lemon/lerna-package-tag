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

    const { packageName: package_name, version } = packageInfo
    core.setOutput('package_name', package_name)
    core.setOutput('version', version)

    core.exportVariable('LERNA_PACKAGE_NAME', package_name)
    core.exportVariable('LERNA_PACKAGE_VERSION', version)
  } catch (error) {
    core.setFailed(error.message)
  }
}

runAction()
